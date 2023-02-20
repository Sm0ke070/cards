import React from 'react'
import {Slider} from 'antd';

type SuperDoubleRangePropsType = {
    onChangeRange?: (value: [number, number]) => void
    onAfterChangeRange?: (value: [number, number]) => void
    value?: [number, number]
    max?:number
    // min, max, step, disable, ...
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange,onAfterChangeRange, value,max
    }
) => {
    const onChangeCallback = (e:[number,number]) => {
        onChangeRange && onChangeRange(e)
    }


    return (
        <div style={{minWidth:200, marginLeft: 10, marginRight:10}}>
            <Slider range defaultValue={[10,55]}  onAfterChange={onAfterChangeRange}
                    onChange={onChangeCallback}
                    value={value}
                    max={max}
            />
        </div>
    )
}

export default SuperDoubleRange
