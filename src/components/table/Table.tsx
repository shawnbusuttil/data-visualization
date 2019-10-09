import React, { FC } from "react";

interface TableProps<T> {
    data: T[];
    columns: string[];
}

const Table: FC<TableProps<any>> = (props) => {
    return <table>
        <thead>
            <tr>
                {props.columns.map(column => <th key={column}>{column}</th>)}
            </tr>
        </thead>
        <tbody>
        {props.data.map((item, i) => <tr key={i}>
            {props.columns.map((col, i) => <td key={i}>{item[col]}</td>)}
        </tr>)}
        </tbody>
    </table>
};

export default Table;