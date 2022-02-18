import React, {useCallback,  useMemo, useState} from 'react';
import './App.css';

function App() {
    const [selectedItem, setSelectedItem] = useState({})
    const data = [
        {id: 1608188117178, specs: ["红色", "套餐一", "128G"]},
        {id: 1608188117179, specs: ["红色", "套餐一", "256G"]},
        {id: 1608188117180, specs: ["红色", "套餐二", "64G"]},
        {id: 1608188117181, specs: ["红色", "套餐二", "128G"]},
        {id: 1608188117182, specs: ["红色", "套餐二", "256G"]},
        {id: 1608188117183, specs: ["红色", "套餐三", "64G"]},
        {id: 1608188117184, specs: ["红色", "套餐三", "128G"]},
        {id: 1608188117185, specs: ["红色", "套餐三", "256G"]},
        {id: 1608188117192, specs: ["紫色", "套餐二", "64G"]},
        {id: 1608188117193, specs: ["紫色", "套餐二", "128G"]},
        {id: 1608188117194, specs: ["紫色", "套餐二", "256G"]},
        {id: 1608188117195, specs: ["紫色", "套餐三", "64G"]},
        {id: 1608188117196, specs: ["紫色", "套餐三", "128G"]},
        {id: 1608188117197, specs: ["紫色", "套餐三", "256G"]},
        {id: 1608188117198, specs: ["紫色", "套餐四", "64G"]},
        {id: 1608188117199, specs: ["紫色", "套餐四", "128G"]},
        {id: 1608188117200, specs: ["紫色", "套餐四", "256G"]},
        {id: 1608188117201, specs: ["白色", "套餐一", "64G"]},
        {id: 1608188117202, specs: ["白色", "套餐一", "128G"]},
        {id: 1608188117203, specs: ["白色", "套餐一", "256G"]},
        {id: 1608188117204, specs: ["白色", "套餐二", "64G"]},
        {id: 1608188117213, specs: ["黑色", "套餐一", "64G"]},
        {id: 1608188117214, specs: ["黑色", "套餐一", "128G"]},
        {id: 1608188117215, specs: ["黑色", "套餐一", "256G"]},
        {id: 1608188117216, specs: ["黑色", "套餐二", "64G"]},
    ];
    const commoditySpecs = [
        {title: '颜色', list: ['红色', '紫色', '白色', '黑色']},
        {title: '套餐', list: ['套餐一', '套餐二', '套餐三', '套餐四']},
        {title: '内存', list: ['64G', '128G', '256G']}
    ];
    const isDisabled = useCallback((title, name) => {
        console.log('isDisabled');
        const copy = JSON.parse(JSON.stringify(selectedItem))
        copy[title] = name
        const selectedArray = []
        for (let key in copy) {
            selectedArray.push(copy[key])
        }
        let b = data.some(item => {
            return selectedArray.filter(Boolean).every(val => item.specs.includes(val))
        })
        return b
    }, [selectedItem])

    const goodsList = useMemo(() => {
        return commoditySpecs.map(i => {
            return {
                title: i.title,
                list: i.list.map(ii => {
                    return {
                        name: ii,
                        disabled: isDisabled(i.title, ii)
                    }
                })
            }
        })
    }, [commoditySpecs])

    const onSelect = (title, name, disabled) => {
        if (!disabled) return
        const copy = JSON.parse(JSON.stringify(selectedItem))
        copy[title] = copy[title] === name ? '' : name
        setSelectedItem(copy)
    }
    const classes = (title, name, disabled) => {
        return [name === selectedItem[title] ? 'selected' : undefined, disabled ? '' : 'disabled'].filter(Boolean).join('')

    }

    return (
        <div className="App">
            <ul className='list'>
                {goodsList.map((item, i) =>
                    <li><span>{item.title}：</span>
                        {item.list.map(l =>
                            <div className={classes(item.title, l.name, l.disabled)} onClick={() => onSelect(item.title, l.name, l.disabled)}>{l.name}</div>)}
                    </li>)}
            </ul>
        </div>
    );
}

export default App;
