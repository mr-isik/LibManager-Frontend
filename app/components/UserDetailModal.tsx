'use client';

import { useState } from 'react';
import {
  Modal,
  Text,
  Group,
  Badge,
  Stack,
  Divider,
  Timeline,
  ThemeIcon,
  Button,
  ActionIcon,
  Tooltip,
  Avatar,
  Progress,
  SimpleGrid,
  Card,
} from '@mantine/core';
import {
  IconUser,
  IconMail,
  IconCalendar,
  IconClock,
  IconPencil,
  IconHistory,
  IconBook,
  IconCheck,
  IconX,
  IconChartBar,
} from '@tabler/icons-react';
import { formatDate, formatRelativeTime } from '../utils/date';
import { PunishmentModal } from './PunishmentModal';

type UserRole = 'admin' | 'user' | 'librarian';

interface UserDetailModalProps {
  opened: boolean;
  onClose: () => void;
  user: {
    id: number;
    first_name: string;
    second_name: string;
    email: string;
    role: UserRole;
    active_loans: number;
    total_loans: number;
    joined_date: Date;
    last_activity: Date;
    loanHistory: Array<{
      id: number;
      book: string;
      borrowedAt: Date;
      returnedAt?: Date;
      isOverdue?: boolean;
    }>;
    stats: {
      onTimeReturns: number;
      lateReturns: number;
      totalBorrowDays: number;
      favoriteCategory: string;
    };
  };
}

const roleColors: Record<UserRole, string> = {
  admin: 'red',
  librarian: 'blue',
  user: 'green',
};

const roleLabels: Record<UserRole, string> = {
  admin: 'Yönetici',
  librarian: 'Kütüphaneci',
  user: 'Kullanıcı',
};

export function UserDetailModal({ opened, onClose, user }: UserDetailModalProps) {
  const [showPunishment, setShowPunishment] = useState(false);

  const stats = [
    {
      title: 'Zamanında İade',
      value: user.stats.onTimeReturns,
      color: 'green',
      icon: IconCheck,
    },
    {
      title: 'Geç İade',
      value: user.stats.lateReturns,
      color: 'red',
      icon: IconX,
    },
    {
      title: 'Toplam Gün',
      value: user.stats.totalBorrowDays,
      color: 'blue',
      icon: IconCalendar,
    },
    {
      title: 'Favori Kategori',
      value: user.stats.favoriteCategory,
      color: 'grape',
      icon: IconChartBar,
    },
  ];

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={
          <Group gap="xs">
            <IconUser size={20} />
            <Text fw={500}>Kullanıcı Detayı</Text>
          </Group>
        }
        size="lg"
      >
        <Stack gap="md">
          <Group>
            <Avatar size="xl" radius="xl" color="blue">
              {user.first_name[0]}
              {user.second_name[0]}
            </Avatar>
            <div style={{ flex: 1 }}>
              <Group justify="space-between">
                <div>
                  <Text size="xl" fw={700}>
                    {user.first_name} {user.second_name}
                  </Text>
                  <Group gap="xs">
                    <IconMail size={14} color="var(--mantine-color-gray-6)" />
                    <Text size="sm" c="dimmed">
                      {user.email}
                    </Text>
                  </Group>
                </div>
                <Badge color={roleColors[user.role]}>{roleLabels[user.role]}</Badge>
              </Group>
            </div>
          </Group>

          <SimpleGrid cols={2} spacing="lg">
            {stats.map((stat) => (
              <Card key={stat.title} padding="sm" radius="md" withBorder>
                <Group>
                  <ThemeIcon size="lg" color={stat.color} variant="light">
                    <stat.icon size={20} />
                  </ThemeIcon>
                  <div>
                    <Text size="xs" c="dimmed">
                      {stat.title}
                    </Text>
                    <Text fw={700} size="lg">
                      {stat.value}
                    </Text>
                  </div>
                </Group>
              </Card>
            ))}
          </SimpleGrid>

          <Group grow>
            <Stack gap="xs">
              <Group gap="xs">
                <IconCalendar size={16} color="var(--mantine-color-gray-6)" />
                <Text size="sm" c="dimmed">
                  Kayıt Tarihi
                </Text>
              </Group>
              <Text size="sm">{formatDate(user.joined_date)}</Text>
            </Stack>

            <Stack gap="xs">
              <Group gap="xs">
                <IconClock size={16} color="var(--mantine-color-gray-6)" />
                <Text size="sm" c="dimmed">
                  Son Aktivite
                </Text>
              </Group>
              <Text size="sm">{formatRelativeTime(user.last_activity)}</Text>
            </Stack>
          </Group>

          <Stack gap="xs">
            <Text size="sm" fw={500}>
              Ödünç Durumu
            </Text>
            <Group gap="xs">
              <div style={{ flex: 1 }}>
                <Text size="sm">
                  {user.active_loans} aktif ödünç / {user.total_loans} toplam
                </Text>
                <Progress
                  value={(user.active_loans / 5) * 100}
                  size="lg"
                  color={user.active_loans >= 4 ? 'red' : 'blue'}
                />
              </div>
            </Group>
          </Stack>

          <Divider />

          <Stack gap="xs">
            <Group justify="space-between">
              <Group gap="xs">
                <IconHistory size={16} />
                <Text size="sm" fw={500}>
                  Ödünç Geçmişi
                </Text>
              </Group>
              <Badge>{user.loanHistory.length} kayıt</Badge>
            </Group>

            <Timeline active={user.loanHistory.length - 1} bulletSize={24} lineWidth={2}>
              {user.loanHistory.map((loan) => (
                <Timeline.Item
                  key={loan.id}
                  bullet={
                    <ThemeIcon
                      size={22}
                      color={loan.returnedAt ? (loan.isOverdue ? 'red' : 'green') : 'blue'}
                      variant="light"
                    >
                      {loan.returnedAt ? (
                        loan.isOverdue ? (
                          <IconX size={12} />
                        ) : (
                          <IconCheck size={12} />
                        )
                      ) : (
                        <IconBook size={12} />
                      )}
                    </ThemeIcon>
                  }
                  title={
                    <Group justify="space-between" wrap="nowrap">
                      <Text size="sm" fw={500}>
                        {loan.book}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {formatRelativeTime(loan.borrowedAt)}
                      </Text>
                    </Group>
                  }
                >
                  <Text size="xs" mt={4}>
                    {loan.returnedAt
                      ? `${formatDate(loan.borrowedAt)} - ${formatDate(loan.returnedAt)}`
                      : `${formatDate(loan.borrowedAt)}'den beri ödünçte`}
                  </Text>
                </Timeline.Item>
              ))}
            </Timeline>
          </Stack>

          <Divider />

          <Group justify="space-between">
            <Button variant="light" onClick={onClose}>
              Kapat
            </Button>

            <Group>
              <Tooltip label="Düzenle">
                <ActionIcon variant="light" color="blue" size="lg">
                  <IconPencil style={{ width: 20, height: 20 }} />
                </ActionIcon>
              </Tooltip>
              <Button color="red" onClick={() => setShowPunishment(true)}>
                Ceza Uygula
              </Button>
            </Group>
          </Group>
        </Stack>
      </Modal>

      <PunishmentModal
        opened={showPunishment}
        onClose={() => setShowPunishment(false)}
        user={user}
      />
    </>
  );
} 