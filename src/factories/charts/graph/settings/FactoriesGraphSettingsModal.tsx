import { Button, Checkbox, Modal, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSettings } from '@tabler/icons-react';
import { useFormOnChange } from '@/core/form/useFormOnChange';
import { useStore } from '@/core/zustand';
import { useChartsSettings } from '@/factories/charts/store/chartsSlice';

export interface IFactoriesGraphSettingsModalProps {}

const updateChartSettings = (path: string | number, value: any) => {
  useStore.getState().setChartSetting(path as any, value);
};

export function FactoriesGraphSettingsModal(
  props: IFactoriesGraphSettingsModalProps,
) {
  const [opened, { open, close }] = useDisclosure();

  const settings = useChartsSettings();

  const onChangeHandler = useFormOnChange(updateChartSettings);

  return (
    <>
      <Button
        onClick={open}
        leftSection={<IconSettings size={16} />}
        variant="default"
      >
        Configuración del gráfico
      </Button>

      <Modal title="Configuración del gráfico" size="md" opened={opened} onClose={close}>
        <Stack gap="md">
          <Checkbox
            label="El ancho coincide con la cantidad de entrada."
            description="Si se marca esta opción, el grosor de las aristas del grafo será proporcional a la cantidad de recursos de entrada."
            checked={settings.widthMatchesInputAmount}
            onChange={onChangeHandler('widthMatchesInputAmount')}
          />
          {/* <Checkbox
            label="Colorize edges by transport"
            description="If checked, the edges will be colored by the transport type"
            checked={settings.colorizeEdgesByTransport}
            onChange={onChangeHandler('colorizeEdgesByTransport')}
          /> */}
        </Stack>
      </Modal>
    </>
  );
}
