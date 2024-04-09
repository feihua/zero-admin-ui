import { useState } from 'react';
import type { ProductParams } from '@/pages/pms/product/data';

export default () => {
  const [productParams, setProductParams] = useState<ProductParams>();

  return { productParams, setProductParams };
};
