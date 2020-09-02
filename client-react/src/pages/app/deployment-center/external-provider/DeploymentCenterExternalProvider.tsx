import React, { useState, useEffect } from 'react';
import { Field } from 'formik';
import { ActionButton } from 'office-ui-fabric-react';
import TextField from '../../../../components/form-controls/TextField';
import { useTranslation } from 'react-i18next';
import RadioButton from '../../../../components/form-controls/RadioButton';
import { additionalTextFieldControl } from '../DeploymentCenter.styles';
import { PasswordFieldType, RepoTypeOptions } from '../../../../models/external';
import { DeploymentCenterCodeFormData, DeploymentCenterFieldProps } from '../DeploymentCenter.types';

const DeploymentCenterExternalProvider: React.FC<DeploymentCenterFieldProps<DeploymentCenterCodeFormData>> = props => {
  const { formProps } = props;
  const { t } = useTranslation();

  const [repoType, setRepoType] = useState<RepoTypeOptions>(RepoTypeOptions.Public);
  const [providerPasswordType, setProviderPasswordType] = useState<PasswordFieldType>('password');

  const toggleShowProviderPassword = () => {
    setProviderPasswordType(!providerPasswordType ? 'password' : undefined);
  };

  useEffect(() => {
    if (formProps) {
      setRepoType(formProps.values.externalRepoType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formProps && formProps.values.externalRepoType]);

  return (
    <>
      <h3>{t('deploymentCenterCodeExternalGitTitle')}</h3>

      <Field
        id="deployment-center-settings-repository-option"
        label={t('deploymentCenterOAuthRepository')}
        name="repo"
        component={TextField}
      />

      <Field id="deployment-center-settings-branch-option" label={t('deploymentCenterOAuthBranch')} name="branch" component={TextField} />

      <Field
        id="deployment-center-settings-external-private-repo"
        label={t('deploymentCenterCodeExternalRepositoryTypeLabel')}
        name="externalRepoType"
        component={RadioButton}
        options={[
          {
            key: RepoTypeOptions.Public,
            text: t('deploymentCenterCodeExternalPublicRepositoryOption'),
          },
          {
            key: RepoTypeOptions.Private,
            text: t('deploymentCenterCodeExternalPrivateRepositoryOption'),
          },
        ]}
      />

      {repoType === RepoTypeOptions.Private && (
        <>
          <Field
            id="deployment-center-external-provider-username"
            label={t('deploymentCenterCodeExternalUsernameLabel')}
            name="externalUsername"
            component={TextField}
          />

          <Field
            id="deployment-center-external-provider-password"
            label={t('deploymentCenterCodeExternalPasswordLabel')}
            name="externalPassword"
            component={TextField}
            type={providerPasswordType}
            additionalControls={[
              <ActionButton
                id="deployment-center-external-provider-password-visibility-toggle"
                key="deployment-center-external-provider-password-visibility-toggle"
                className={additionalTextFieldControl}
                ariaLabel={providerPasswordType === 'password' ? t('showProviderPasswordAriaLabel') : t('hideProviderPasswordAriaLabel')}
                onClick={toggleShowProviderPassword}
                iconProps={{ iconName: providerPasswordType === 'password' ? 'RedEye' : 'Hide' }}>
                {providerPasswordType === 'password' ? t('show') : t('hide')}
              </ActionButton>,
            ]}
          />
        </>
      )}
    </>
  );
};

export default DeploymentCenterExternalProvider;