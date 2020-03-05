import React, { forwardRef, memo, useState, useMemo } from 'react'
import { Placeholder } from 'semantic-ui-react'
// import Item from './Item'
import Photo from './Photo'

import {
    CellMeasurer,
    CellMeasurerCache,
    createMasonryCellPositioner,
    Masonry,
} from 'react-virtualized';
import AutoSizer from 'react-virtualized-auto-sizer'
import ImageMeasurer from 'react-virtualized-image-measurer'

const generateSrc = id => `https://ljpv2-upload.dnamicro.net/file?entity=photo&id=${id}&force=true`



export default ({ list = [] }) => {

    // We need to make sure images are loaded from scratch every time for this demo
    const noCacheList = list.map(item => ({
        ...item,
        image: item.image + '?noCache=' + Math.random(),
    }));

    const columnWidth = 210;
    const defaultHeight = 250;
    const defaultWidth = columnWidth;

    const cache = new CellMeasurerCache({
        defaultHeight,
        defaultWidth,
        fixedWidth: false,
    });

    return (

        <AutoSizer>
            {({ height, width }) => {

                const cellPositioner = createMasonryCellPositioner({
                    cellMeasurerCache: cache,
                    columnCount: Math.floor(width / columnWidth),
                    columnWidth,
                    spacer: 10,
                })

                const MasonryComponent = ({ itemsWithSizes, height, width }) => {
                    function cellRenderer({ index, key, parent, style }) {
                        const { item, size } = itemsWithSizes[index];
                        const height = columnWidth * (size.height / size.width) || defaultHeight;

                        return (
                            <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
                                <div style={style}>
                                    <img
                                        src={generateSrc(item.id)}
                                        alt={item.title}
                                        style={{
                                            height: height,
                                            width: columnWidth,
                                        }}
                                    />
                                    <h4>{item.title}</h4>
                                </div>
                            </CellMeasurer>
                        );
                    }

                    return (
                        <Masonry
                            cellCount={itemsWithSizes.length}
                            cellMeasurerCache={cache}
                            cellPositioner={cellPositioner}
                            cellRenderer={cellRenderer}
                            height={height}
                            width={width}
                        />
                    );
                };


                return (
                    <ImageMeasurer
                        items={noCacheList}
                        image={item => generateSrc(item.id)}
                        defaultHeight={defaultHeight}
                        defaultWidth={defaultWidth}>
                        {({ itemsWithSizes }) => <MasonryComponent itemsWithSizes={itemsWithSizes} height={height} width={width} />}
                    </ImageMeasurer>
                )
            }}
        </AutoSizer>

    )
}
