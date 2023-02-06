import React, { useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import usePagination from '../../utils/hooks/usePagination';
import ReactJson from 'react-json-view';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const useStyles = makeStyles((theme) => ({
  root: (lastIndex: any) => {
    console.log('lastIndex: ' + lastIndex);
    type GenericObject = { [key: string]: any };
    let itemMarker: GenericObject = {};

    for (var i = 0; i < 10; i++) {
      if (i < lastIndex) {
        itemMarker[`& li:nth-child(${i + 1})::after`] = {
          backgroundColor: '#FF9933',
          content: '"New"',
          position: 'relative',
          top: '-15px',
          right: '15px',
        };
      } else if (i >= lastIndex) {
        itemMarker[`& li:nth-child(${i + 1})::after`] = {
          backgroundColor: 'none',
          content: 'none',
        };
      }
    }

    return {
      '& > *': {
        margin: theme.spacing(0.75, 0, 1.5, 0),
      },
      '& .MuiPaginationItem-page': {
        boxShadow:
          '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
      },
      '& .Mui-selected': {
        borderStyle: 'solid',
        borderColor: '#FF9933',
        borderWidth: 'thick',
        color: 'white',
      },
      ...itemMarker,
    };
  },
}));

export function StyledPagination({ data, lastIndex = 0 }: any) {
  let [page, setPage] = useState(1);
  const [loading, setLoading] = useState<Boolean>(false);
  const PER_PAGE = 1;

  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e: any, p: number) => {
    setLoading(true);
    e.preventDefault();
    setPage(p);
    _DATA.jump(p);
    setTimeout(() => setLoading(false), 500);
  };

  const classes = useStyles(lastIndex);

  return (
    <Box p="1">
      <Pagination
        className={classes.root}
        count={count}
        size="medium"
        page={page}
        variant="outlined"
        shape="rounded"
        hideNextButton={true}
        hidePrevButton={true}
        siblingCount={10}
        onChange={handleChange}
      />
      {loading ? (
        <Skeleton count={4.5} />
      ) : (
        _DATA
          .currentData()
          .map((v: any) => (
            <ReactJson
              src={v}
              theme={'rjv-default'}
              name={false}
              collapseStringsAfterLength={85}
            />
          ))
      )}
    </Box>
  );
}
