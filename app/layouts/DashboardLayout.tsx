'use client';

import {
  AppShell,
  Burger,
  Group,
  UnstyledButton,
  Text,
  Avatar,
  Menu,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBooks,
  IconUsers,
  IconCategory,
  IconUserCircle,
  IconLogout,
  IconSettings,
} from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();

  const mainLinks = [
    { icon: IconBooks, label: 'Kitaplar', href: '/books' },
    { icon: IconUsers, label: 'Kullanıcılar', href: '/users' },
    { icon: IconCategory, label: 'Kategoriler', href: '/categories' },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text size="lg" fw={700}>
              Kütüphane Yönetimi
            </Text>
          </Group>

          <Menu shadow="md" width={200}>
            <Menu.Target>
              <UnstyledButton>
                <Group>
                  <Avatar color="blue" radius="xl">
                    MK
                  </Avatar>
                  <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                      Mehmet Kütüphaneci
                    </Text>
                    <Text c="dimmed" size="xs">
                      mehmet@kutuphane.com
                    </Text>
                  </div>
                </Group>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<IconUserCircle style={{ width: rem(14), height: rem(14) }} />}>
                Profil
              </Menu.Item>
              <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                Ayarlar
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
              >
                Çıkış Yap
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {mainLinks.map((link) => (
          <UnstyledButton
            key={link.label}
            onClick={() => {
              router.push(link.href);
            }}
            style={{
              display: 'block',
              width: '100%',
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: pathname === link.href ? 'var(--mantine-color-blue-light)' : 'transparent',
              marginBottom: '8px',
            }}
          >
            <Group>
              <link.icon size={20} />
              <Text size="sm">{link.label}</Text>
            </Group>
          </UnstyledButton>
        ))}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
} 