import * as React from 'react';

import { useNotification, useFetchClient } from '@strapi/admin/strapi-admin';
import { useNotifyAT } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';

import { pluginId } from '../pluginId';

export const useLocales = () => {
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const { notifyStatus } = useNotifyAT();
  const { get } = useFetchClient();

  const { data, error, isLoading } = useQuery(
    [pluginId, 'locales'],
    async () => {
      const { data } = await get('/upload/locales');

      return data;
    },
    {
      enabled: true,
      staleTime: 0,
      cacheTime: 0,
      select(data) {
        if (data?.results && Array.isArray(data.results)) {
          return {
            ...data,
            results: data.results
          };
        }

        return data;
      },
    }
  );

  React.useEffect(() => {
    if (data) {
      notifyStatus(
        formatMessage({
          id: 'list.asset.at.finished',
          defaultMessage: 'The assets have finished loading.',
        })
      );
    }
  }, [data, formatMessage, notifyStatus]);

  React.useEffect(() => {
    if (error) {
      toggleNotification({
        type: 'danger',
        message: formatMessage({ id: 'notification.error' }),
      });
    }
  }, [error, formatMessage, toggleNotification]);

  return { data, error, isLoading };
};
