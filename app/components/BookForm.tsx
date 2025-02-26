'use client';

import { useForm } from '@mantine/form';
import {
  TextInput,
  NumberInput,
  Textarea,
  Button,
  Group,
  Select,
  Stack,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { Book } from '../types';

interface BookFormProps {
  initialValues?: Partial<Book>;
  onSubmit: (values: Partial<Book>) => Promise<void>;
  onCancel: () => void;
}

export function BookForm({ initialValues, onSubmit, onCancel }: BookFormProps) {
  const form = useForm({
    initialValues: {
      title: '',
      isbn: '',
      author_id: 0,
      edition: 1,
      description: '',
      ...initialValues,
    },
    validate: {
      title: (value) => (!value ? 'Başlık zorunludur' : null),
      isbn: (value) => (!value ? 'ISBN zorunludur' : null),
      author_id: (value) => (!value ? 'Yazar seçimi zorunludur' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await onSubmit(values);
      notifications.show({
        title: 'Başarılı',
        message: 'Kitap başarıyla kaydedildi',
        color: 'green',
        icon: <IconCheck size={16} />,
      });
    } catch {
      notifications.show({
        title: 'Hata',
        message: 'Kitap kaydedilirken bir hata oluştu',
        color: 'red',
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label="Başlık"
          placeholder="Kitap başlığı"
          required
          {...form.getInputProps('title')}
        />

        <TextInput
          label="ISBN"
          placeholder="ISBN numarası"
          required
          {...form.getInputProps('isbn')}
        />

        <Select
          label="Yazar"
          placeholder="Yazar seçin"
          required
          data={[
            // TODO: API'den yazarlar gelecek
            { value: '1', label: 'George Orwell' },
            { value: '2', label: 'Fyodor Dostoyevski' },
          ]}
          {...form.getInputProps('author_id')}
        />

        <NumberInput
          label="Baskı"
          placeholder="Baskı numarası"
          min={1}
          {...form.getInputProps('edition')}
        />

        <Textarea
          label="Açıklama"
          placeholder="Kitap açıklaması"
          autosize
          minRows={3}
          {...form.getInputProps('description')}
        />

        <Group justify="flex-end">
          <Button variant="light" onClick={onCancel}>
            İptal
          </Button>
          <Button type="submit">Kaydet</Button>
        </Group>
      </Stack>
    </form>
  );
} 