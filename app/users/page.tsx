'use client';

import { DashboardLayout } from '../layouts/DashboardLayout';
import {
  Title,
  Group,
  Button,
  TextInput,
  Table,
  ActionIcon,
  Menu,
  Text,
  Badge,
  Avatar,
  Card,
  SimpleGrid,
  ThemeIcon,
  Progress,
  Tooltip,
  SegmentedControl,
  Stack,
} from '@mantine/core';
import {
  IconSearch,
  IconDots,
  IconEdit,
  IconTrash,
  IconUserPlus,
  IconUsers,
  IconUserCheck,
  IconUserExclamation,
  IconBooks,
  IconFilter,
  IconEye,
  IconAlertTriangle,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useSearch } from '../hooks/useSearch';
import { UserDetailModal } from '../components/UserDetailModal';
import { PunishmentModal } from '../components/PunishmentModal';

type UserRole = 'admin' | 'user' | 'librarian';

interface UserData {
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
}

const mockData: UserData[] = [
  {
    id: 1,
    first_name: 'Ahmet',
    second_name: 'Yılmaz',
    email: 'ahmet@example.com',
    role: 'user',
    active_loans: 2,
    total_loans: 15,
    joined_date: new Date('2024-01-15'),
    last_activity: new Date('2024-02-25'),
    loanHistory: [],
    stats: {
      onTimeReturns: 0,
      lateReturns: 0,
      totalBorrowDays: 0,
      favoriteCategory: '',
    },
  },
  {
    id: 2,
    first_name: 'Ayşe',
    second_name: 'Kaya',
    email: 'ayse@example.com',
    role: 'librarian',
    active_loans: 0,
    total_loans: 5,
    joined_date: new Date('2023-12-01'),
    last_activity: new Date('2024-02-26'),
    loanHistory: [],
    stats: {
      onTimeReturns: 0,
      lateReturns: 0,
      totalBorrowDays: 0,
      favoriteCategory: '',
    },
  },
  {
    id: 3,
    first_name: 'Mehmet',
    second_name: 'Demir',
    email: 'mehmet@example.com',
    role: 'admin',
    active_loans: 1,
    total_loans: 8,
    joined_date: new Date('2023-11-15'),
    last_activity: new Date('2024-02-24'),
    loanHistory: [],
    stats: {
      onTimeReturns: 0,
      lateReturns: 0,
      totalBorrowDays: 0,
      favoriteCategory: '',
    },
  },
];

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

const stats = [
  {
    title: 'Toplam Kullanıcı',
    value: '567',
    color: 'blue',
    icon: IconUsers,
  },
  {
    title: 'Aktif Kullanıcılar',
    value: '489',
    color: 'green',
    icon: IconUserCheck,
  },
  {
    title: 'Cezalı Kullanıcılar',
    value: '78',
    color: 'red',
    icon: IconUserExclamation,
  },
  {
    title: 'Ödünç Alınan Kitaplar',
    value: '1,234',
    color: 'grape',
    icon: IconBooks,
  },
];

export default function UsersPage() {
  const [filter, setFilter] = useState<'all' | UserRole>('all');
  const { searchQuery, handleSearch, filteredData } = useSearch({
    data: mockData,
    searchFields: ['first_name', 'second_name', 'email'],
  });

  const filteredUsers = filteredData.filter(
    (user) => filter === 'all' || user.role === filter
  );

  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showPunishment, setShowPunishment] = useState(false);
  const [punishmentUser, setPunishmentUser] = useState<UserData | null>(null);

  const handlePunishment = (user: UserData) => {
    setPunishmentUser(user);
    setShowPunishment(true);
  };

  // TODO: API entegrasyonu yapılacak
  const handleDelete = async (id: number) => {
    console.log('Silinen kullanıcı ID:', id);
    // setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const rows = filteredUsers.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar color="blue" radius="xl">
            {user.first_name[0]}
            {user.second_name[0]}
          </Avatar>
          <div>
            <Text size="sm" fw={500}>
              {user.first_name} {user.second_name}
            </Text>
            <Text size="xs" c="dimmed">
              {user.email}
            </Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Badge color={roleColors[user.role]}>{roleLabels[user.role]}</Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <div style={{ flex: 1 }}>
            <Text size="sm">{user.active_loans} aktif ödünç</Text>
            <Progress
              value={(user.active_loans / 5) * 100}
              size="sm"
              color={user.active_loans >= 4 ? 'red' : 'blue'}
            />
          </div>
          <Tooltip label="Toplam Ödünç">
            <Badge variant="light">{user.total_loans}</Badge>
          </Tooltip>
        </Group>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Tooltip label="Detay">
            <ActionIcon
              variant="light"
              color="blue"
              onClick={() => setSelectedUser(user)}
            >
              <IconEye style={{ width: 16, height: 16 }} />
            </ActionIcon>
          </Tooltip>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDots style={{ width: 20, height: 20 }} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<IconEdit style={{ width: 14, height: 14 }} />}>
                Düzenle
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={<IconTrash style={{ width: 14, height: 14 }} />}
                onClick={() => handleDelete(user.id)}
              >
                Sil
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="orange"
                leftSection={<IconAlertTriangle style={{ width: 14, height: 14 }} />}
                onClick={() => handlePunishment(user)}
              >
                Ceza Uygula
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <DashboardLayout>
      <Group justify="space-between" mb="lg">
        <Title order={2}>Kullanıcılar</Title>
        <Button leftSection={<IconUserPlus size={20} />}>Yeni Kullanıcı Ekle</Button>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" mb="xl">
        {stats.map((stat) => (
          <Card key={stat.title} padding="lg" radius="md" withBorder>
            <Group>
              <ThemeIcon size="xl" color={stat.color} variant="light">
                <stat.icon size={28} />
              </ThemeIcon>
              <div>
                <Text size="xs" c="dimmed">
                  {stat.title}
                </Text>
                <Text fw={700} size="xl">
                  {stat.value}
                </Text>
              </div>
            </Group>
          </Card>
        ))}
      </SimpleGrid>

      <Card withBorder mb="lg">
        <Group p="md">
          <TextInput
            placeholder="Ad, soyad veya e-posta ara..."
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1 }}
            value={searchQuery}
            onChange={(e) => handleSearch(e.currentTarget.value)}
          />
          <Tooltip label="Filtrele">
            <ActionIcon variant="light" color="blue" size="lg">
              <IconFilter style={{ width: 20, height: 20 }} />
            </ActionIcon>
          </Tooltip>
          <SegmentedControl
            value={filter}
            onChange={(value) => setFilter(value as typeof filter)}
            data={[
              { label: 'Tümü', value: 'all' },
              { label: 'Kullanıcılar', value: 'user' },
              { label: 'Kütüphaneciler', value: 'librarian' },
              { label: 'Yöneticiler', value: 'admin' },
            ]}
          />
        </Group>
      </Card>

      <Card withBorder>
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Kullanıcı</Table.Th>
              <Table.Th>Rol</Table.Th>
              <Table.Th>Ödünç Durumu</Table.Th>
              <Table.Th>İşlemler</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>

        {filteredUsers.length === 0 && (
          <Stack align="center" py="xl">
            <IconUsers size={40} color="var(--mantine-color-gray-5)" />
            <Text ta="center" c="dimmed">
              {searchQuery
                ? 'Arama kriterlerine uygun kullanıcı bulunamadı.'
                : 'Henüz kullanıcı bulunmamaktadır.'}
            </Text>
          </Stack>
        )}
      </Card>

      {selectedUser && (
        <UserDetailModal
          opened={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          user={selectedUser}
        />
      )}

      {punishmentUser && (
        <PunishmentModal
          opened={showPunishment}
          onClose={() => {
            setShowPunishment(false);
            setPunishmentUser(null);
          }}
          user={punishmentUser}
        />
      )}
    </DashboardLayout>
  );
} 