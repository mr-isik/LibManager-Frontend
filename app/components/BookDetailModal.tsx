'use client';

import { useState } from 'react';
import {
  Modal,
  Text,
  Group,
  Stack,
  Button,
  Badge,
  SimpleGrid,
  Card,
  ThemeIcon,
  Progress,
  Divider,
  Timeline,
  ActionIcon,
  Tooltip,
} from '@mantine/core';
import {
  IconBook,
  IconBookOff,
  IconCalendar,
  IconCategory,
  IconLanguage,
  IconPencil,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';
import { LoanBookModal } from './LoanBookModal';

interface BookDetailModalProps {
  opened: boolean;
  onClose: () => void;
  book: {
    id: number;
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    publishYear: number;
    language: string;
    category: string;
    totalCopies: number;
    availableCopies: number;
    loanHistory: Array<{
      id: number;
      user: {
        id: number;
        first_name: string;
        second_name: string;
      };
      borrowedAt: Date;
      returnedAt?: Date;
      isOverdue: boolean;
    }>;
  };
  users: Array<{
    id: number;
    first_name: string;
    second_name: string;
    email: string;
    active_loans: number;
  }>;
}

export function BookDetailModal({ opened, onClose, book, users }: BookDetailModalProps) {
  const [showLoan, setShowLoan] = useState(false);

  const availabilityPercentage = (book.availableCopies / book.totalCopies) * 100;

  return (
    <>
      <Modal opened={opened} onClose={onClose} title={<Text fw={500}>{book.title}</Text>} size="lg">
        <Stack>
          <Group>
            <Badge color="blue" variant="light">
              {book.category}
            </Badge>
            <Badge color="gray" variant="light">
              {book.language}
            </Badge>
          </Group>

          <SimpleGrid cols={2}>
            <Card withBorder>
              <Group>
                <ThemeIcon color="blue" variant="light">
                  <IconBook size={16} />
                </ThemeIcon>
                <div>
                  <Text size="xs" c="dimmed">
                    Toplam Kopya
                  </Text>
                  <Text fw={500}>{book.totalCopies}</Text>
                </div>
              </Group>
            </Card>

            <Card withBorder>
              <Group>
                <ThemeIcon color={book.availableCopies > 0 ? 'green' : 'red'} variant="light">
                  <IconBookOff size={16} />
                </ThemeIcon>
                <div>
                  <Text size="xs" c="dimmed">
                    Mevcut Kopya
                  </Text>
                  <Text fw={500}>{book.availableCopies}</Text>
                </div>
              </Group>
            </Card>
          </SimpleGrid>

          <Card withBorder>
            <Stack gap="xs">
              <Text size="sm" fw={500}>
                Kitap Durumu
              </Text>
              <Progress.Root size="xl">
                <Progress.Section
                  value={availabilityPercentage}
                  color={availabilityPercentage > 50 ? 'green' : availabilityPercentage > 20 ? 'yellow' : 'red'}
                >
                  <Progress.Label>%{Math.round(availabilityPercentage)}</Progress.Label>
                </Progress.Section>
              </Progress.Root>
              <Text size="xs" c="dimmed">
                {book.availableCopies} kopya mevcut / {book.totalCopies} toplam kopya
              </Text>
            </Stack>
          </Card>

          <Card withBorder>
            <Stack gap="xs">
              <Group justify="space-between">
                <Text size="sm" fw={500}>
                  Kitap Bilgileri
                </Text>
                <ActionIcon variant="light" color="blue" size="sm">
                  <IconPencil size={16} />
                </ActionIcon>
              </Group>

              <SimpleGrid cols={2}>
                <Group>
                  <ThemeIcon color="blue" variant="light" size="sm">
                    <IconUser size={14} />
                  </ThemeIcon>
                  <div>
                    <Text size="xs" c="dimmed">
                      Yazar
                    </Text>
                    <Text size="sm">{book.author}</Text>
                  </div>
                </Group>

                <Group>
                  <ThemeIcon color="blue" variant="light" size="sm">
                    <IconCalendar size={14} />
                  </ThemeIcon>
                  <div>
                    <Text size="xs" c="dimmed">
                      Yayın Yılı
                    </Text>
                    <Text size="sm">{book.publishYear}</Text>
                  </div>
                </Group>

                <Group>
                  <ThemeIcon color="blue" variant="light" size="sm">
                    <IconCategory size={14} />
                  </ThemeIcon>
                  <div>
                    <Text size="xs" c="dimmed">
                      Yayınevi
                    </Text>
                    <Text size="sm">{book.publisher}</Text>
                  </div>
                </Group>

                <Group>
                  <ThemeIcon color="blue" variant="light" size="sm">
                    <IconLanguage size={14} />
                  </ThemeIcon>
                  <div>
                    <Text size="xs" c="dimmed">
                      Dil
                    </Text>
                    <Text size="sm">{book.language}</Text>
                  </div>
                </Group>
              </SimpleGrid>
            </Stack>
          </Card>

          <Divider />

          <Stack gap="xs">
            <Group justify="space-between">
              <Text size="sm" fw={500}>
                Ödünç Geçmişi
              </Text>
              <Tooltip label="Ödünç Ver">
                <ActionIcon
                  variant="light"
                  color="blue"
                  size="sm"
                  onClick={() => setShowLoan(true)}
                  disabled={book.availableCopies === 0}
                >
                  <IconUsers size={16} />
                </ActionIcon>
              </Tooltip>
            </Group>

            <Timeline active={book.loanHistory.length - 1} bulletSize={24} lineWidth={2}>
              {book.loanHistory.map((loan) => (
                <Timeline.Item
                  key={loan.id}
                  bullet={<IconBook size={12} />}
                  title={
                    <Group gap="xs">
                      <Text size="sm">
                        {loan.user.first_name} {loan.user.second_name}
                      </Text>
                      {loan.isOverdue && !loan.returnedAt && (
                        <Badge color="red" size="sm">
                          Gecikmiş
                        </Badge>
                      )}
                    </Group>
                  }
                >
                  <Text size="xs" mt={4}>
                    {new Date(loan.borrowedAt).toLocaleDateString('tr-TR')} -{' '}
                    {loan.returnedAt
                      ? new Date(loan.returnedAt).toLocaleDateString('tr-TR')
                      : 'Henüz iade edilmedi'}
                  </Text>
                </Timeline.Item>
              ))}
            </Timeline>
          </Stack>

          <Group justify="flex-end">
            <Button variant="light" onClick={onClose}>
              Kapat
            </Button>
          </Group>
        </Stack>
      </Modal>

      <LoanBookModal
        opened={showLoan}
        onClose={() => setShowLoan(false)}
        book={book}
        users={users}
      />
    </>
  );
} 