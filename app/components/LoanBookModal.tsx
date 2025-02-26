'use client';

import {
  Modal,
  Text,
  Group,
  Stack,
  Button,
  Select,
  NumberInput,
  Textarea,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { addDays } from '../utils/date';

interface LoanBookModalProps {
  opened: boolean;
  onClose: () => void;
  book: {
    id: number;
    title: string;
    author: string;
  };
  users: Array<{
    id: number;
    first_name: string;
    second_name: string;
    email: string;
    active_loans: number;
  }>;
}

export function LoanBookModal({ opened, onClose, book, users }: LoanBookModalProps) {
  const form = useForm({
    initialValues: {
      user_id: '',
      duration: 14,
      startDate: new Date(),
      note: '',
    },
    validate: {
      user_id: (value) => (!value ? 'Kullanıcı seçiniz' : null),
      duration: (value) =>
        value < 1
          ? 'Süre en az 1 gün olmalıdır'
          : value > 30
          ? 'Süre en fazla 30 gün olabilir'
          : null,
    },
  });

  const selectedUser = users.find((user) => user.id === Number(form.values.user_id));

  const handleSubmit = async (values: typeof form.values) => {
    try {
      // TODO: API entegrasyonu yapılacak
      console.log('Kitap ödünç verildi:', {
        bookId: book.id,
        ...values,
        endDate: addDays(values.startDate, values.duration),
      });

      notifications.show({
        title: 'Başarılı',
        message: 'Kitap başarıyla ödünç verildi',
        color: 'green',
        icon: <IconCheck size={16} />,
      });

      onClose();
      form.reset();
    } catch {
      notifications.show({
        title: 'Hata',
        message: 'Kitap ödünç verilirken bir hata oluştu',
        color: 'red',
      });
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={500}>
          Ödünç Ver - {book.title} ({book.author})
        </Text>
      }
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Select
            label="Kullanıcı"
            placeholder="Seçiniz"
            data={users.map((user) => ({
              value: user.id.toString(),
              label: `${user.first_name} ${user.second_name} (${user.email})`,
              disabled: user.active_loans >= 5,
            }))}
            required
            {...form.getInputProps('user_id')}
          />

          {selectedUser && selectedUser.active_loans >= 3 && (
            <Text size="sm" c="orange">
              Uyarı: Kullanıcının {selectedUser.active_loans} aktif ödünç kitabı var.
            </Text>
          )}

          <NumberInput
            label="Süre (Gün)"
            placeholder="Ödünç süresi"
            min={1}
            max={30}
            required
            {...form.getInputProps('duration')}
          />

          <DateInput
            label="Başlangıç Tarihi"
            placeholder="Tarih seçiniz"
            value={form.values.startDate}
            onChange={(date) => form.setFieldValue('startDate', date || new Date())}
            required
          />

          <Text size="sm" c="dimmed">
            İade Tarihi: {addDays(form.values.startDate, form.values.duration).toLocaleDateString()}
          </Text>

          <Textarea
            label="Not"
            placeholder="Varsa eklemek istediğiniz notlar"
            autosize
            minRows={2}
            maxRows={4}
            {...form.getInputProps('note')}
          />

          <Group justify="flex-end">
            <Button variant="light" onClick={onClose}>
              İptal
            </Button>
            <Button type="submit" color="blue">
              Ödünç Ver
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
} 