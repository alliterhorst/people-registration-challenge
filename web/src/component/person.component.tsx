import { useCallback, useEffect, useState } from 'react';
import { IColor } from '../interface/color.interface';
import { FetchStatusEnum } from '../enum/fetch-status.enum';
import { getColors } from '../service/person.service';
import {
  Container,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { ICreatePerson } from '../interface/create-person.interface';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().required(),
  cpf: Joi.string().required(),
  email: Joi.string().required(),
  colorId: Joi.string().uuid({ version: 'uuidv4' }).required(),
  comment: Joi.string().optional(),
});

function PersonComponent() {
  const [colors, setColors] = useState<IColor[]>([]);
  const [colorId, setColorId] = useState<string>('');

  const [colorsStatus, setColorsStatus] = useState<FetchStatusEnum>(
    FetchStatusEnum.NOT_STARTED,
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

  useEffect(() => {
    if (!colorsStatus) return;
    if (colorsStatus === FetchStatusEnum.NOT_STARTED) startFetchColors();
  }, [colorsStatus, startFetchColors]);

  useEffect(() => {}, []);

  const reload = () => setColorsStatus(FetchStatusEnum.NOT_STARTED);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICreatePerson>({
    resolver: joiResolver(schema), // yup, joi and even your own.
    mode: 'all',
    shouldFocusError: true,
  });

  const handleChange = (event: SelectChangeEvent) => {
    const colorId = event.target.value as string;
    setColorId(colorId);
    setValue('colorId', colorId);
  };

  const onSubmit = (data: ICreatePerson) => {
    console.log(data);
  };

  return (
    <Container maxWidth="sm">
      <div>
        {colorsStatus === FetchStatusEnum.LOADING && <LinearProgress />}
        <p>{colorsStatus}</p>
        <p>{colors.length}</p>
        <button onClick={reload}>Reload</button>

        <form onSubmit={handleSubmit((d) => onSubmit(d))}>
          <FormControl fullWidth>
            <InputLabel id="favorite-color-select-label">
              Cor Favorita
            </InputLabel>
            <Select
              labelId="favorite-color-select-label"
              id="favorite-color-select"
              value={colorId}
              label="Favorite Color"
              onChange={handleChange}
            >
              {colors.map((color) => (
                <MenuItem value={color.id}>{color.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Email"
            fullWidth
            name="email"
            error={!!errors.email}
            helperText={errors?.email?.message}
            inputRef={register}
          />
          <TextField
            label="Nome"
            fullWidth
            name="name"
            error={!!errors.name}
            helperText={errors?.name?.message}
            inputRef={register}
          />
        </form>
      </div>
    </Container>
  );
}

export default PersonComponent;
