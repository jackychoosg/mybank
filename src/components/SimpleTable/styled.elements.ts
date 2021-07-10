import styled from 'styled-components'

export const Table = styled.table`
  width: 100%;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
  border: none;
  border-spacing: 0;
  color: #3e3e3e;
  border-collapse: collapse;
  .st-body tr:nth-child(odd) {
    background: #efefef;
  }

  .st-body tr:nth-child(even) {
    background: #fff;
  }

  .st-body tr td {
    border-right: 1px solid #cbcbcb;
  }

  .st-body tr td:last-child {
    border-right: none;
  }

  .st-header tr {
    border-bottom: solid 1px #cbcbcb;
  }

  .st-body tr:hover {
    background: #ebebeb;
  }
`

export const TableHeader = styled.thead`
  background: #fff;
`

export const TH = styled.th`
  padding: 20px;
  background: #fff;
  text-align: left;
`

export const TD = styled.td`
  padding: 20px;
`
export const TR = styled.tr``

export const TableBody = styled.tbody``

export const Center = styled.div`
  text-align: center;
`
