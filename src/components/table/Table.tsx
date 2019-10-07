import React, { FC } from "react";
import withPagination from "../../hoc/withPagination";

interface TableProps<T> {
    data: T[];
    clicked: (key: string) => void;
    columns: { name: string, isSortable: boolean }[];
}

const Table: FC<TableProps<{}>> = (props) => {
    return <table>
        <thead>
            <tr>
                {props.columns.map(column => <th key={column.name} onClick={column.isSortable && props.clicked ? () => props.clicked(column.name) : undefined}>
                    {column.name}
                </th>)}
            </tr>
        </thead>
        <tbody>{props.data.map(val => <tr>{Object.keys(val).map(key => <td>{val[key]}</td>)}</tr>)}</tbody>
    </table>
};

export default Table;