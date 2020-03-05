import React, { forwardRef, memo, useState, useMemo } from 'react'
import { Placeholder } from 'semantic-ui-react'
import Item from './Item'

import { VariableSizeGrid as Grid, areEqual } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import memoize from 'memoize-one'

const createItemData = memoize(({ columnCount, list }) => ({
    columnCount,
    list,
}))

const CellRenderer = memo(({ columnIndex, rowIndex, style, data, setCardDimensions }) => {
    const { list, columnCount } = data
    const singleColumnIndex = columnIndex + rowIndex * columnCount
    const photo = list[singleColumnIndex]

    return (
        <div style={style}>
            {photo && (
                <Item {...photo} setCardDimensions={setCardDimensions} />
            )}
        </div>
    )
}, areEqual)

const innerElementType = forwardRef(({ style, ...rest }, ref) => (
    <div
        ref={ref}
        style={{
            paddingLeft: 5,
            paddingTop: 5
        }}
        {...rest}
    />
));

export default ({ list = [] }) => {

    const [cardDimensions, setCardDimensions] = useState({
        width: 295,
        height: 550
    })

    const memoFunction = (dimensions) => {
        // console.log(cardDimensions, "memo called");
        setCardDimensions(dimensions)
    }

    useMemo(memoFunction, [cardDimensions])

    return (
        <AutoSizer>
            {({ height, width }) => {
                console.log('AutoSizer', cardDimensions)
                const cardWidth = 345
                const cardHeight = 560
                const columnCount = Math.floor(width / cardWidth)
                const rowCount = Math.ceil(list.length / columnCount)
                const itemData = createItemData({ list, columnCount })
                return (
                    <Grid
                        className="grid"
                        width={width}
                        height={height}
                        columnCount={columnCount}
                        columnWidth={() => cardWidth}
                        rowCount={rowCount}
                        rowHeight={() => cardHeight}
                        itemData={itemData}
                        innerElementType={innerElementType}
                        overscanRowCount={2}
                    >
                        {props => <CellRenderer setCardDimensions={memoFunction} {...props} />}
                    </Grid>
                )
            }}
        </AutoSizer>
    )
}
