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

interface PunishmentModalProps {
  opened: boolean;
  onClose: () => void;
  user: {
    id: number;
    first_name: string;
    second_name: string;
  };
}

const punishmentTypes = [
  { value: 'late_return', label: 'Geç İade' },
  { value: 'damaged_book', label: 'Kitap Hasarı' },
  { value: 'lost_book', label: 'Kayıp Kitap' },
  { value: 'violation', label: 'Kural İhlali' },
];

export function PunishmentModal({ opened, onClose, user }: PunishmentModalProps) {
  const form = useForm({
    initialValues: {
      type: '',
      duration: 7,
      reason: '',
      startDate: new Date(),
    },
    validate: {
      type: (value) => (!value ? 'Ceza türü seçiniz' : null),
      duration: (value) =>
        value < 1 ? 'Süre en az 1 gün olmalıdır' : null,
      reason: (value) =>
        !value ? 'Ceza nedeni giriniz' : value.length < 10 ? 'Ceza nedeni çok kısa' : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      // TODO: API entegrasyonu yapılacak
      console.log('Ceza uygulandı:', {
        userId: user.id,
        ...values,
        endDate: addDays(values.startDate, values.duration),
      });

      notifications.show({
        title: 'Başarılı',
        message: 'Ceza başarıyla uygulandı',
        color: 'green',
        icon: <IconCheck size={16} />,
      });

      onClose();
      form.reset();
    } catch {
      notifications.show({
        title: 'Hata',
        message: 'Ceza uygulanırken bir hata oluştu',
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
          Ceza Uygula - {user.first_name} {user.second_name}
        </Text>
      }
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Select
            label="Ceza Türü"
            placeholder="Seçiniz"
            data={punishmentTypes}
            required
            {...form.getInputProps('type')}
          />

          <NumberInput
            label="Süre (Gün)"
            placeholder="Ceza süresi"
            min={1}
            max={365}
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

          <Textarea
            label="Açıklama"
            placeholder="Ceza nedeni ve detayları"
            autosize
            minRows={3}
            maxRows={5}
            required
            {...form.getInputProps('reason')}
          />

          <Group justify="flex-end">
            <Button variant="light" onClick={onClose}>
              İptal
            </Button>
            <Button type="submit" color="red">
              Ceza Uygula
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
} 