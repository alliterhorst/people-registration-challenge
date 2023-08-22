import { useCallback, useEffect, useState } from 'react';
import { IColor } from '../interface/color.interface';
import { FetchStatusEnum } from '../enum/fetch-status.enum';
import { getColors, postPerson } from '../service/person.service';
import {
  Alert,
  AlertColor,
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { Resolver, useForm } from 'react-hook-form';
import { ICreatePerson } from '../interface/create-person.interface';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { isCpf } from 'validator-brazil';
import { AxiosError } from 'axios';

const schema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  cpf: yup
    .string()
    .test('isCPF', 'O ${path} é inválido, insira apenas numeros', (value) =>
      isCpf(value as string),
    )
    .required('O cpf é obrigatório'), //('isCPF', 'O CPF é obrigatório'),
  email: yup
    .string()
    .email('O email é inválido')
    .required('O email é obrigatório'),
  colorId: yup
    .string()
    .uuid('Cor favorita inválida')
    .required('A cor favorita é obrigatório'),
  comment: yup.string().optional(),
});

function PersonComponent() {
  const [colors, setColors] = useState<IColor[]>([]);
  const [colorId, setColorId] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [colorsStatus, setColorsStatus] = useState<FetchStatusEnum>(
    FetchStatusEnum.NOT_STARTED,
  );
  const [createPersonStatus, setCreatePersonStatus] = useState<FetchStatusEnum>(
    FetchStatusEnum.NOT_STARTED,
  );
  const [message, setMessage] = useState<{
    alertColor: AlertColor;
    message: string;
  }>();

  const setErrorMessage = useCallback(
    (message: string): void => {
      setMessage({
        alertColor: 'error',
        message,
      });
    },
    [setMessage],
  );

  const setSuccessMessage = useCallback(
    (message: string): void => {
      setMessage({
        alertColor: 'success',
        message,
      });
    },
    [setMessage],
  );

  const startFetchColors = useCallback(async (): Promise<void> => {
    setColorsStatus(FetchStatusEnum.LOADING);
    try {
      const fetchColors = await getColors();
      setColors(fetchColors);
      setColorsStatus(FetchStatusEnum.DONE);
    } catch (error) {
      console.error(error);
      setColorsStatus(FetchStatusEnum.FAILURE);
    }
  }, [setColors, setColorsStatus]);

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<ICreatePerson>({
    resolver: yupResolver(schema) as Resolver<ICreatePerson>,
    mode: 'all',
    shouldFocusError: true,
  });

  const createPerson = useCallback(
    async (person: ICreatePerson): Promise<void> => {
      setCreatePersonStatus(FetchStatusEnum.LOADING);
      try {
        await postPerson(person);
        setCreatePersonStatus(FetchStatusEnum.DONE);
        setSuccessMessage('Usuário cadastrado com sucesso');
        reset();
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          setErrorMessage(error?.response?.data?.message || error?.message);
        } else if (error instanceof Error) {
          setErrorMessage(error?.message);
        }
        setCreatePersonStatus(FetchStatusEnum.FAILURE);
      }
    },
    [setSuccessMessage, setErrorMessage, setCreatePersonStatus, reset],
  );

  useEffect(() => {
    if (!colorsStatus) return;
    if (colorsStatus === FetchStatusEnum.NOT_STARTED) startFetchColors();
  }, [colorsStatus, startFetchColors]);

  useEffect(() => {
    if (message) setOpen(true);
  }, [message]);

  const handleChange = (event: SelectChangeEvent) => {
    const colorId = event.target.value as string;
    setColorId(colorId);
  };

  useEffect(() => {
    setValue('colorId', colorId);
    setFocus('email');
  }, [colorId, setFocus, setValue]);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: ICreatePerson) => {
    createPerson(data);
  };

  return (
    <Container maxWidth="sm">
      <div>
        {colorsStatus === FetchStatusEnum.LOADING && <LinearProgress />}
        {createPersonStatus === FetchStatusEnum.LOADING && <LinearProgress />}
        <Typography mt={2}>Cadastro de Cliente</Typography>
        <br></br>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          {message && (
            <Alert
              onClose={handleClose}
              severity={message.alertColor}
              sx={{ width: '100%' }}
            >
              {message.message}
            </Alert>
          )}
        </Snackbar>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Nome"
            fullWidth
            required
            {...register('name')}
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
          <br />
          <br />

          <FormControl fullWidth>
            <InputLabel id="favorite-color-select-label">
              Cor Favorita
            </InputLabel>
            <Select
              labelId="favorite-color-select-label"
              id="favorite-color-select"
              {...register('colorId')}
              error={!!errors.colorId}
              value={colorId}
              required
              onChange={handleChange}
            >
              {colors.map((color) => (
                <MenuItem key={color.id} value={color.id}>
                  {color.name}
                </MenuItem>
              ))}
            </Select>

            {!!errors.colorId && (
              <FormHelperText error>{errors?.colorId?.message}</FormHelperText>
            )}
          </FormControl>
          <br />
          <br />
          <TextField
            label="Email"
            fullWidth
            {...register('email')}
            required
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
          <br />
          <br />
          <TextField
            label="CPF"
            fullWidth
            required
            type="tel"
            placeholder="00000000000"
            {...register('cpf')}
            error={!!errors.cpf}
            helperText={errors?.cpf?.message}
          />
          <br />
          <br />
          <TextField
            label="Observações"
            fullWidth
            type="text"
            {...register('comment')}
            error={!!errors.comment}
            helperText={errors?.comment?.message}
          />
          <br />
          <br />
          <Button type="submit" variant="contained">
            Cadastrar
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default PersonComponent;
