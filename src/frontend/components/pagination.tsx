import { FunctionComponent } from 'react'
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

interface PaginationProps {
  page: number
  count: number
}

const PaginationStyle = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;
  border: 2px solid rgba(255, 255, 255, 1);
  border-radius: 10px;
  font-size: 14px;
  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 2px solid rgba(255, 255, 255, 1);
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
  @media only screen and (max-width: 600px) {
    font-size: 11px;
    & > * {
      padding: 12px 14px;
  }
  }
`;


const Pagination: FunctionComponent<PaginationProps> = ({ page, count }) => {
const perPage = 10;
  const pageCount: number = Math.ceil(count / perPage);
  return (
    <PaginationStyle>
      <Head>
        <title>
          Swapi - Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/?page=${page - 1}`}>
        <a aria-disabled={page <= 1}>← Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/?page=${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next →</a>
      </Link>
    </PaginationStyle>
  );
}

export default Pagination;