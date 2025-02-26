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
  Paper,
  SimpleGrid,
  Progress,
  Card,
  RingProgress,
  Stack,
  Tooltip,
} from '@mantine/core';
import {
  IconSearch,
  IconDots,
  IconEdit,
  IconTrash,
  IconFolderPlus,
  IconBook,
  IconBookOff,
  IconChartPie,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useSearch } from '../hooks/useSearch';

// TODO: API'den gelecek veri tipi
interface CategoryData {
  id: number;
  title: string;
  book_count: number;
  total_books_percentage: number;
  available_books: number;
  borrowed_books: number;
}

const mockData: CategoryData[] = [
  {
    id: 1,
    title: 'Roman',
    book_count: 150,
    total_books_percentage: 45,
    available_books: 120,
    borrowed_books: 30,
  },
  {
    id: 2,
    title: 'Bilim',
    book_count: 80,
    total_books_percentage: 25,
    available_books: 65,
    borrowed_books: 15,
  },
  {
    id: 3,
    title: 'Tarih',
    book_count: 60,
    total_books_percentage: 20,
    available_books: 45,
    borrowed_books: 15,
  },
  {
    id: 4,
    title: 'Felsefe',
    book_count: 30,
    total_books_percentage: 10,
    available_books: 25,
    borrowed_books: 5,
  },
];

export default function CategoriesPage() {
  const { searchQuery, handleSearch, filteredData } = useSearch({
    data: mockData,
    searchFields: ['title'],
  });

  const [categories, setCategories] = useState<CategoryData[]>(mockData);

  // TODO: API entegrasyonu yapılacak
  const handleDelete = (id: number) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  const rows = filteredData.map((category) => (
    <Table.Tr key={category.id}>
      <Table.Td>{category.title}</Table.Td>
      <Table.Td>{category.book_count}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Text size="sm" style={{ width: '60px' }}>
            {category.total_books_percentage}%
          </Text>
          <Progress
            value={category.total_books_percentage}
            size="lg"
            style={{ flex: 1 }}
          />
        </Group>
      </Table.Td>
      <Table.Td>
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
              onClick={() => handleDelete(category.id)}
            >
              Sil
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <DashboardLayout>
      <Group justify="space-between" mb="lg">
        <Title order={2}>Kategoriler</Title>
        <Button leftSection={<IconFolderPlus size={20} />}>Yeni Kategori Ekle</Button>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" mb="xl">
        {categories.map((category) => (
          <Card key={category.id} padding="lg" radius="md" withBorder>
            <Card.Section p="md">
              <Group justify="space-between" mb="xs">
                <Text fw={500} size="lg">
                  {category.title}
                </Text>
                <ActionIcon variant="light" color="blue" size="lg">
                  <IconChartPie style={{ width: 20, height: 20 }} />
                </ActionIcon>
              </Group>
            </Card.Section>

            <Card.Section p="md">
              <Group>
                <RingProgress
                  size={80}
                  roundCaps
                  thickness={8}
                  sections={[
                    { value: (category.available_books / category.book_count) * 100, color: 'teal' },
                    { value: (category.borrowed_books / category.book_count) * 100, color: 'orange' },
                  ]}
                  label={
                    <Text ta="center" fz="sm" fw={700}>
                      {category.book_count}
                    </Text>
                  }
                />
                <Stack gap={5} style={{ flex: 1 }}>
                  <Tooltip label="Müsait Kitaplar">
                    <Group gap="xs">
                      <IconBook size={16} color="var(--mantine-color-teal-6)" />
                      <Text size="sm" c="dimmed">
                        {category.available_books} kitap müsait
                      </Text>
                    </Group>
                  </Tooltip>
                  <Tooltip label="Ödünç Verilen Kitaplar">
                    <Group gap="xs">
                      <IconBookOff size={16} color="var(--mantine-color-orange-6)" />
                      <Text size="sm" c="dimmed">
                        {category.borrowed_books} kitap ödünçte
                      </Text>
                    </Group>
                  </Tooltip>
                </Stack>
              </Group>
            </Card.Section>
          </Card>
        ))}
      </SimpleGrid>

      <TextInput
        placeholder="Kategori ara..."
        mb="md"
        leftSection={<IconSearch size={16} />}
        value={searchQuery}
        onChange={(e) => handleSearch(e.currentTarget.value)}
      />

      <Table highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Kategori</Table.Th>
            <Table.Th>Kitap Sayısı</Table.Th>
            <Table.Th>Toplam Kitaplardaki Oranı</Table.Th>
            <Table.Th>İşlemler</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      {filteredData.length === 0 && (
        <Text ta="center" mt="xl" c="dimmed">
          {searchQuery ? 'Arama sonucu bulunamadı.' : 'Henüz kategori bulunmamaktadır.'}
        </Text>
      )}
    </DashboardLayout>
  );
} 