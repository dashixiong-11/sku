import React, {FunctionComponent, useEffect, useRef, forwardRef, useState} from 'react';
import './index.scss'

export const Demo = () => {
    const [selected, setSelected] = useState({})
    const [array, setArray] = useState([])
    const [canSelectedArray, setCanSelectedArray] = useState([])
    let adjoinArray
    const specList = [
        {title: "颜色", list: ["紫色", "红色"]},
        {title: "套餐", list: ["套餐一", "套餐二","套餐三","套餐四"]},
        {title: "内存", list: ["64G", "128G", "256G"]},
        {title: "尺寸", list: ["10", "11", "12"]},
    ];
    let quantity = specList.map(i => i.list).flat()
    //  ['红色','紫色','套餐一','套餐二']

    const specCombinationList = [
        { id: "1", specs: [ "套餐一","紫色", "64G","11"] },
        { id: "2", specs: [ "套餐二","紫色", "64G",'11'] },
        { id: "3", specs: [ "套餐三","红色", "64G","12"] },
        { id: "4", specs: [ "套餐三","紫色", "128G","10"] },
        { id: "4", specs: [ "套餐四","紫色", "256G","10"] },
        { id: "5", specs: [ "套餐四","紫色", "128G","12"] },
    ]

    //初始化矩阵
    adjoinArray = Array(quantity.length * quantity.length).fill(0);

    const isActive = (id, title) => {
        return selected[title] == id
    }

    const canSelected = (id) =>{
        if(canSelectedArray.length > 0){
            return canSelectedArray.includes(id)
        }else {
            return  true
        }
    }
    const onClick = (id, title) => {
        if( !canSelected(id) ){return}
        const copy = JSON.parse(JSON.stringify(selected))
        if (copy[title] !== id) {
            copy[title] = id
            setSelected(() => copy)
        }
    }
    // 设置相互可到达顶点的值
    const setAdjoinVertexs = (id, side) => {
        const pIndex = quantity.indexOf(id);
        side.forEach((item) => {
            const index = quantity.indexOf(item);
            adjoinArray[index * quantity.length + pIndex] = 1;
        });
    }

    const setAdParam = quantity.map(q => {
        let result = specCombinationList.filter(s => {
            return s.specs.includes(q)
        }).map(i => i.specs).flat().filter(i => i != q)
        let someLevel = specList.filter(i => i.list.includes(q)).map(i => i.list).flat().filter(h => h != q)
        let x = new Set([...result, ...someLevel])
        return {id: q, sideList: [...x]}
    })
    setAdParam.map(i => setAdjoinVertexs(i.id, i.sideList))

    //传入一个顶点，找出可以达到的其余顶点
    const find = (id) => {
        const pIndex = quantity.indexOf(id)
        const indexArray = quantity.map((q, index) => {
            return index * quantity.length + pIndex
        })
        return indexArray.filter(i => {
            return adjoinArray[i] == 1
        }).map(index => Math.floor(index / quantity.length))
    }
    useEffect(() => {
        let tmp = []
        let arge = []
        Object.keys(selected).map(k => {
            tmp.push(selected[k]);
        })
        tmp.map(t =>
            arge.push(find(t))
        )

        setArray(arge)
    }, [selected])
    useEffect(() => {
        if (array.length > 0) {
            let textArray =  intersection(...array).map( (i:number) => {return quantity[i]})
            setCanSelectedArray(textArray)
        }
    }, [array])

    //取两个数组的交集
    const intersection = function (...arrs) {
        let res = arrs[0]
        for (let i = 1; i < arrs.length; i++) {
            res = res.filter(item => arrs[i].includes(item))
        }
        return [...new Set(res)]
    }
    return <>
        <div style={{fontSize: '13px', padding: '50px'}}>
            {specList.map(i => <div key={i.title}>
                <span>{i.title}:</span>
                <div style={{margin: '1em 0', display: 'flex'}}>
                    {i.list.map(h => <button
                        className={`btn ${canSelected(h) ? '':'xxx'} ${isActive(h, i.title) ? 'active' : ''}`}
                        onClick={() => {
                            onClick(h, i.title)
                        }}
                        key={h}>{h}</button>)}
                </div>
            </div>)}
        </div>
    </>

}
export default Demo