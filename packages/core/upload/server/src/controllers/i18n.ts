import _ from 'lodash';
import utils from '@strapi/utils';

import type { Context } from 'koa';
import type { Core } from '@strapi/types';

// NOTE: Added by @brambergvd
const formatLocales = async (localesService: any)=>{
  if (!localesService) return {};
  const locales = await localesService.find() || [];
  return locales
};

export default ({ strapi }: { strapi: Core.Strapi }) => {
  return {
    // NOTE: Added by @brambergvd
    async getLocales(ctx: Context) {
      const localesService = strapi.plugin('i18n')?.service('locales');
      const locales = await formatLocales(localesService);

      return { locales };
    },
  };
};
