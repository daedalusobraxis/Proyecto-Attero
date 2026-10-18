import {
  Button,
  Divider,
  FileButton,
  List,
  Modal,
  Progress,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCloudUpload } from '@tabler/icons-react';
import type { ParsedSatisfactorySave } from './ParseSavegameMessages';

export interface IImportSavegameModalProps {
  /** Whether an import is currently running (drives the loading UI). */
  importing: boolean;
  /** Progress fraction (0-1) and optional status message. */
  progress: { value: number; message?: string };
  /**
   * Picks the file and runs the import via the parent (which owns
   * the {@link useSavegameImport} hook). Resolves with the parsed
   * save on success so the modal knows when to close, or `null` if
   * the parent aborted (e.g. no game selected).
   */
  onImport: (file: File) => Promise<ParsedSatisfactorySave | null>;
}

export function ImportSavegameRecipesModal(props: IImportSavegameModalProps) {
  const [opened, { toggle, close }] = useDisclosure();

  const handleImport = (file: File) => {
    props
      .onImport(file)
      .then(save => {
        if (save) close();
      })
      .catch(() => {
        // Notification surfaced by the parent's hook; keep the modal
        // open so the user can retry with a different file.
      });
  };

  return (
    <>
      <Tooltip label="Importa el estado de esta partida desde un archivo de guardado de Satisfactory.">
        <Button
          data-tutorial-id="recipes-from-savegame"
          onClick={toggle}
          variant="default"
          leftSection={<IconCloudUpload size={16} />}
        >
          Importar partida guardada
        </Button>
      </Tooltip>
      <Modal opened={opened} onClose={close} title="Importar partida guardada">
        <Stack gap="xs">
          <Text size="sm">
            Elige un archivo Satisfactory<code>.sav</code> La partida guardada contiene el avance el jugador y reemplazará el progreso actual de la partida en el juego. Se importarán los siguientes elementos:
          </Text>
          <List size="sm" withPadding>
            <List.Item>Recetas disponibles (establecidas como predeterminadas del juego)</List.Item>
            <List.Item>
              Nodos de recursos utilizados y babosas / esferas Mercer / somersloops recolectados en el mapa.
            </List.Item>
            <List.Item>
              Diseño de recursos aleatorio (1.2+), cuando está presente en el archivo de guardado.
            </List.Item>
          </List>

          <Divider mt="sm" mb="sm" />

          <FileButton
            onChange={file => {
              if (!file) {
                return;
              }

              handleImport(file);
            }}
            accept=".sav"
          >
            {fileButtonProps => (
              <Button
                {...fileButtonProps}
                leftSection={<IconCloudUpload size={16} />}
                loading={props.importing}
              >
                Seleccionar partida guardada
              </Button>
            )}
          </FileButton>

          {props.importing && (
            <>
              <Progress
                color="orange"
                value={props.progress.value * 100}
                animated
              />
              {props.progress.message && (
                <Text size="sm">{props.progress.message}</Text>
              )}
            </>
          )}
        </Stack>
      </Modal>
    </>
  );
}
