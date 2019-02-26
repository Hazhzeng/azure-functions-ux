import React, { useContext } from 'react';
import { FormikProps } from 'formik';
import { AppSettingsFormValues } from '../AppSettings.types';
import { useTranslation } from 'react-i18next';
import HandlerMappings from '../HandlerMappings/HandlerMappings';
import VirtualApplications from '../VirtualApplications/VirtualApplications';
import { isEqual } from 'lodash-es';
import AzureStorageMounts from '../AzureStorageMounts/AzureStorageMounts';
import { PermissionsContext } from '../Contexts';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';

interface PathMappingsPivotProps {
  enablePathMappings: boolean;
  enableAzureStorageMount: boolean;
}
const PathMappingsPivot: React.FC<FormikProps<AppSettingsFormValues> & PathMappingsPivotProps> = props => {
  const { enablePathMappings, enableAzureStorageMount } = props;
  const { t } = useTranslation();
  const { app_write } = useContext(PermissionsContext);
  return (
    <>
      {enablePathMappings && (
        <>
          <h3>{t('handlerMappings')}</h3>
          <HandlerMappings {...props} />
          <h3>{t('virtualApplications')}</h3>
          <VirtualApplications {...props} />
        </>
      )}
      {enableAzureStorageMount && (
        <>
          <h3>{t('mountStorage')}</h3>
          {app_write ? (
            <AzureStorageMounts {...props} />
          ) : (
            <div id="app-settings-storage-mount-rbac-message">
              <MessageBar messageBarType={MessageBarType.warning} isMultiline={false}>
                {t('storageMountsNoPermissions')}
              </MessageBar>
            </div>
          )}
        </>
      )}
    </>
  );
};

export const pathMappingsDirty = (values: AppSettingsFormValues, initialValues: AppSettingsFormValues) => {
  return (
    !isEqual(values.virtualApplications, initialValues.virtualApplications) ||
    !isEqual(values.config.properties.handlerMappings, initialValues.config.properties.handlerMappings)
  );
};

export default PathMappingsPivot;