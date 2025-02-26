'use client';

import { DashboardLayout } from './layouts/DashboardLayout';
import {
  Title,
  Text,
  Paper,
  SimpleGrid,
  Group,
  Card,
  Timeline,
  ThemeIcon,
  Badge,
  Table,
  ScrollArea,
} from '@mantine/core';
import {
  IconBook,
  IconUsers,
  IconCategory2,
  IconClock,
  IconCheck,
  IconX,
} from '@tabler/icons-react';
import { formatDate, formatRelativeTime } from './utils/date';

const stats = [
  {
    title: 'Toplam Kitap',
    value: '1,234',
    icon: IconBook,
    color: 'blue',
    secondaryStats: [
      { label: 'Müsait', value: '1,012', color: 'teal' },
      { label: 'Ödünçte', value: '222', color: 'orange' },
    ],
  },
  {
    title: 'Toplam Üye',
    value: '567',
    icon: IconUsers,
    color: 'green',
    secondaryStats: [
      { label: 'Aktif', value: '489', color: 'teal' },
      { label: 'Cezalı', value: '78', color: 'red' },
    ],
  },
  {
    title: 'Kategori',
    value: '23',
    icon: IconCategory2,
    color: 'grape',
    secondaryStats: [
      { label: 'En Çok', value: 'Roman', color: 'blue' },
      { label: 'En Az', value: 'Şiir', color: 'pink' },
    ],
  },
];

type LoanStatus = 'active' | 'returned' | 'overdue';

interface Loan {
  id: number;
  user: string;
  book: string;
  date: Date;
  status: LoanStatus;
}

const recentLoans: Loan[] = [
  {
    id: 1,
    user: 'Ahmet Yılmaz',
    book: '1984',
    date: new Date('2024-02-25'),
    status: 'active',
  },
  {
    id: 2,
    user: 'Ayşe Kaya',
    book: 'Suç ve Ceza',
    date: new Date('2024-02-24'),
    status: 'returned',
  },
  {
    id: 3,
    user: 'Mehmet Demir',
    book: 'Dönüşüm',
    date: new Date('2024-02-23'),
    status: 'overdue',
  },
];

const upcomingReturns = [
  {
    id: 1,
    user: 'Ali Yıldız',
    book: 'Sefiller',
    dueDate: new Date('2024-03-01'),
  },
  {
    id: 2,
    user: 'Zeynep Çelik',
    book: 'Beyaz Diş',
    dueDate: new Date('2024-03-02'),
  },
  {
    id: 3,
    user: 'Can Özdemir',
    book: 'Fareler ve İnsanlar',
    dueDate: new Date('2024-03-03'),
  },
];

const statusColors: Record<LoanStatus, string> = {
  active: 'blue',
  returned: 'green',
  overdue: 'red',
};

const statusLabels: Record<LoanStatus, string> = {
  active: 'Aktif',
  returned: 'İade Edildi',
  overdue: 'Gecikmiş',
};

export default function Home() {
  return (
    <DashboardLayout>
      <Title order={2} mb="md">
        Hoş Geldiniz
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg" mb="xl">
        {stats.map((stat) => (
          <Card key={stat.title} padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text size="xs" c="dimmed" fw={700}>
                {stat.title}
              </Text>
              <ThemeIcon color={stat.color} variant="light" size="lg">
                <stat.icon style={{ width: 20, height: 20 }} />
              </ThemeIcon>
            </Group>

            <Group align="flex-end" gap="xs" mb="lg">
              <Text fz={30} fw={700}>
                {stat.value}
              </Text>
            </Group>

            <Group grow>
              {stat.secondaryStats.map((secondary) => (
                <Paper key={secondary.label} withBorder p="xs" radius="md">
                  <Group justify="space-between" gap="xs">
                    <Text size="xs" c="dimmed">
                      {secondary.label}
                    </Text>
                    <Text size="sm" fw={500} c={secondary.color}>
                      {secondary.value}
                    </Text>
                  </Group>
                </Paper>
              ))}
            </Group>
          </Card>
        ))}
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        <Card padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <Text fw={500}>Son İşlemler</Text>
            <Badge>Son 3 Gün</Badge>
          </Group>

          <Timeline active={1} bulletSize={24} lineWidth={2}>
            {recentLoans.map((loan) => (
              <Timeline.Item
                key={loan.id}
                bullet={
                  loan.status === 'returned' ? (
                    <IconCheck size={12} />
                  ) : loan.status === 'overdue' ? (
                    <IconX size={12} />
                  ) : (
                    <IconClock size={12} />
                  )
                }
                title={
                  <Group justify="space-between" wrap="nowrap">
                    <Text size="sm" fw={500}>
                      {loan.book}
                    </Text>
                    <Badge color={statusColors[loan.status]} size="sm">
                      {statusLabels[loan.status]}
                    </Badge>
                  </Group>
                }
              >
                <Text size="xs" mt={4}>
                  {loan.user} tarafından {formatRelativeTime(loan.date)} ödünç alındı
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <Text fw={500}>Yaklaşan İadeler</Text>
            <Badge color="orange">Önümüzdeki 7 Gün</Badge>
          </Group>

          <ScrollArea h={250}>
            <Table highlightOnHover withTableBorder>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Kitap</Table.Th>
                  <Table.Th>Kullanıcı</Table.Th>
                  <Table.Th>İade Tarihi</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {upcomingReturns.map((return_) => (
                  <Table.Tr key={return_.id}>
                    <Table.Td>{return_.book}</Table.Td>
                    <Table.Td>{return_.user}</Table.Td>
                    <Table.Td>{formatDate(return_.dueDate)}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Card>
      </SimpleGrid>
    </DashboardLayout>
  );
}
