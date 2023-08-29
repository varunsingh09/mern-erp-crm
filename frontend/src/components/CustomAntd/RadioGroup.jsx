import * as React from 'react';
import { Radio } from 'antd';

const RadioGroup = () => {
    return (
        <Radio.Group defaultValue={1} name={`status`}>
            <Radio value={1}>Active</Radio>
            <Radio value={0}>InActive</Radio>
        </Radio.Group>
    );
}


export default RadioGroup;
