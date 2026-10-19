import { Anchor, Button, Container, Divider, Group, Text } from '@mantine/core';
import { IconBrandDiscord, IconBrandGithub } from '@tabler/icons-react';
import clsx from 'clsx';
import { InstallAppLink } from '@/pwa/InstallAppLink';
import { FeedbackButton } from '@/third-party/FeedbackButton';
import { KofiSupportButton } from '@/third-party/KofiSupportButton';
import classes from './Footer.module.css';

const links = [
  {
    link: 'https://github.com/daedalusobraxis/Proyecto-Attero',
    label: 'GitHub',
    labelNode: (
      <Group gap="xs">
        <IconBrandGithub size={16} />
        GitHub
      </Group>
    ),
  },
  { link: 'mailto:daedalus.obraxis@gmail.com', label: 'Contact' },
  { link: '/privacy-policy', label: 'Privacy Policy' },
];

export function Footer({ compact }: { compact?: boolean }) {
  const items = links.map(link => (
    <Anchor<'a'>
      c="dimmed"
      key={link.label}
      href={link.link}
      target="_blank"
      rel="noopener noreferrer"
      size="sm"
    >
      {link.labelNode ?? link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container
        className={clsx(classes.inner, {
          [classes.compact]: compact,
        })}
        size="lg"
      >
        {/* <MantineLogo size={28} /> */}
        <Group>
          <Text size="sm" c="dimmed">
            v{APP_VERSION} © {new Date().getFullYear()} Satisfactory Logistics
          </Text>
          <Group className={classes.links}>
            {items}
            <InstallAppLink />
          </Group>
        </Group>
        {compact ? (
          <Group gap="sm">
            
          </Group>
        ) : (
          <Group>

          </Group>
        )}
      </Container>

      {!compact && (
        <>
          <Divider
            styles={{
              root: {
                borderTopColor: 'var(--mantine-color-dark-6)',
              },
            }}
          />
          <Container className={classes.inner} size="lg">
            <Text size="sm" c="dimmed">
              Los recursos provienen de Satisfactory o de sitios web creados y
              propiedad de Coffee Stain Studios, quienes poseen los derechos de autor
              de Satisfactory.
              <br />
              Todas las marcas comerciales y marcas registradas presentes en las imágenes son
              propiedad de Coffee Stain Studios.
            </Text>
          </Container>
        </>
      )}
    </div>
  );
}
