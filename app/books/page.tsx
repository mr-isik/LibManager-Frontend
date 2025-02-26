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
  Card,
  SimpleGrid,
  Tooltip,
  SegmentedControl,
  Stack,
  ThemeIcon,
} from '@mantine/core';
import {
  IconSearch,
  IconDots,
  IconEdit,
  IconTrash,
  IconBook,
  IconBookOff,
  IconFilter,
  IconArrowUp,
  IconArrowDown,
  IconEye,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useSearch } from '../hooks/useSearch';
import { BookDetailModal } from '../components/BookDetailModal';

type BookStatus = 'available' | 'borrowed';

interface BookData {
  id: number;
  title: string;
  author: string;
  isbn: string;
  status: BookStatus;
  category: string;
  borrowCount: number;
  lastBorrowed?: Date;
  edition: number;
  description: string;
  publisher: string;
  publishYear: number;
  language: string;
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
}

const mockData: BookData[] = [
  {
    id: 1,
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0451524935',
    status: 'available',
    category: 'Roman',
    borrowCount: 15,
    lastBorrowed: new Date('2024-02-20'),
    edition: 5,
    description:
      'Distopik bir gelecekte geçen, gözetim toplumu ve totaliter rejimi eleştiren bir başyapıt.',
    publisher: 'Can Yayınları',
    publishYear: 1949,
    language: 'Türkçe',
    totalCopies: 10,
    availableCopies: 10,
    loanHistory: [
      {
        id: 1,
        user: {
          id: 1,
          first_name: 'Ahmet',
          second_name: 'Yılmaz',
        },
        borrowedAt: new Date('2024-01-15'),
        returnedAt: new Date('2024-02-01'),
        isOverdue: false,
      },
      {
        id: 2,
        user: {
          id: 2,
          first_name: 'Ayşe',
          second_name: 'Kaya',
        },
        borrowedAt: new Date('2024-02-05'),
        returnedAt: new Date('2024-02-20'),
        isOverdue: false,
      },
    ],
  },
  {
    id: 2,
    title: 'Suç ve Ceza',
    author: 'Fyodor Dostoyevski',
    isbn: '978-0143058142',
    status: 'borrowed',
    category: 'Roman',
    borrowCount: 12,
    lastBorrowed: new Date('2024-02-25'),
    edition: 3,
    description:
      'Psikolojik bir gerilim romanı. Suç, vicdan ve ahlak kavramlarını derinlemesine işleyen bir klasik.',
    publisher: 'İletişim Yayınları',
    publishYear: 1866,
    language: 'Türkçe',
    totalCopies: 5,
    availableCopies: 5,
    loanHistory: [
      {
        id: 3,
        user: {
          id: 3,
          first_name: 'Mehmet',
          second_name: 'Demir',
        },
        borrowedAt: new Date('2024-02-25'),
        isOverdue: false,
      },
    ],
  },
  {
    id: 3,
    title: 'Dönüşüm',
    author: 'Franz Kafka',
    isbn: '978-1915098789',
    status: 'available',
    category: 'Roman',
    borrowCount: 8,
    edition: 2,
    description:
      'Bir sabah böceğe dönüşen Gregor Samsa\'nın hikayesi. Modern edebiyatın en önemli eserlerinden.',
    publisher: 'İletişim Yayınları',
    publishYear: 1915,
    language: 'Türkçe',
    totalCopies: 3,
    availableCopies: 3,
    loanHistory: [
      {
        id: 4,
        user: {
          id: 4,
          first_name: 'Zeynep',
          second_name: 'Çelik',
        },
        borrowedAt: new Date('2024-01-10'),
        returnedAt: new Date('2024-01-25'),
        isOverdue: false,
      },
    ],
  },
];

const statusColors: Record<BookStatus, string> = {
  available: 'green',
  borrowed: 'yellow',
};

const statusLabels: Record<BookStatus, string> = {
  available: 'Müsait',
  borrowed: 'Ödünç Verildi',
};

const stats = [
  {
    title: 'Toplam Kitap',
    value: '1,234',
    color: 'blue',
    icon: IconBook,
  },
  {
    title: 'Ödünç Verilen',
    value: '234',
    color: 'yellow',
    icon: IconBookOff,
  },
  {
    title: 'En Çok Okunan',
    value: '1984',
    color: 'grape',
    icon: IconArrowUp,
  },
  {
    title: 'En Az Okunan',
    value: 'Dönüşüm',
    color: 'red',
    icon: IconArrowDown,
  },
];

const mockUsers = [
  {
    id: 1,
    first_name: 'Ahmet',
    second_name: 'Yılmaz',
    email: 'ahmet@example.com',
    active_loans: 2,
  },
  {
    id: 2,
    first_name: 'Ayşe',
    second_name: 'Kaya',
    email: 'ayse@example.com',
    active_loans: 1,
  },
  {
    id: 3,
    first_name: 'Mehmet',
    second_name: 'Demir',
    email: 'mehmet@example.com',
    active_loans: 0,
  },
];

export default function BooksPage() {
  const [filter, setFilter] = useState<'all' | BookStatus>('all');
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const { searchQuery, handleSearch, filteredData } = useSearch({
    data: mockData,
    searchFields: ['title', 'author', 'isbn', 'category'],
  });

  const filteredBooks = filteredData.filter(
    (book) => filter === 'all' || book.status === filter
  );

  // TODO: API entegrasyonu yapılacak
  const handleDelete = async (id: number) => {
    console.log('Silinen kitap ID:', id);
    // setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const rows = filteredBooks.map((book) => (
    <Table.Tr key={book.id}>
      <Table.Td>
        <Group gap="sm">
          <IconBook size={20} color="var(--mantine-color-blue-6)" />
          <div>
            <Text size="sm" fw={500}>
              {book.title}
            </Text>
            <Text size="xs" c="dimmed">
              {book.category}
            </Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>{book.author}</Table.Td>
      <Table.Td>{book.isbn}</Table.Td>
      <Table.Td>
        <Badge color={statusColors[book.status]}>
          {statusLabels[book.status]}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Tooltip label="Detay">
            <ActionIcon
              variant="light"
              color="blue"
              onClick={() => setSelectedBook(book)}
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
                onClick={() => handleDelete(book.id)}
              >
                Sil
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
        <Title order={2}>Kitaplar</Title>
        <Button leftSection={<IconBook size={20} />}>Yeni Kitap Ekle</Button>
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
            placeholder="Kitap, yazar veya ISBN ara..."
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
              { label: 'Müsait', value: 'available' },
              { label: 'Ödünç', value: 'borrowed' },
            ]}
          />
        </Group>
      </Card>

      <Card withBorder>
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Kitap</Table.Th>
              <Table.Th>Yazar</Table.Th>
              <Table.Th>ISBN</Table.Th>
              <Table.Th>Durum</Table.Th>
              <Table.Th>İşlemler</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>

        {filteredBooks.length === 0 && (
          <Stack align="center" py="xl">
            <IconBookOff size={40} color="var(--mantine-color-gray-5)" />
            <Text ta="center" c="dimmed">
              {searchQuery
                ? 'Arama kriterlerine uygun kitap bulunamadı.'
                : 'Henüz kitap bulunmamaktadır.'}
            </Text>
          </Stack>
        )}
      </Card>

      {selectedBook && (
        <BookDetailModal
          opened={!!selectedBook}
          onClose={() => setSelectedBook(null)}
          book={selectedBook}
          users={mockUsers}
        />
      )}
    </DashboardLayout>
  );
} 