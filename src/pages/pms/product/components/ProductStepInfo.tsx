import React from 'react';
import {Button} from 'antd';

export interface BaseInfoProps {
  current: number;
  steps: { title: string, nextPrompt?: string, prePrompt?: string }[];
  handleSubmit: () => void
  prev: () => void
  next: () => void
}

const ProductStepInfo: React.FC<BaseInfoProps> = (props) => {

  const current = props.current
  const steps = props.steps

  return (
    <>
      {current > 0 && (
        <Button style={{margin: '0 8px'}} onClick={() => props.prev()}>
          {steps[current].prePrompt}
        </Button>
      )}
      {current === steps.length - 1 && (
        <Button type="primary" onClick={props.handleSubmit}>
          完成,提交商品
        </Button>
      )}
      {current < steps.length - 1 && (
        <Button type="primary" onClick={() => props.next()}>
          {steps[current].nextPrompt}
        </Button>
      )}
    </>
  );
};

export default ProductStepInfo;
