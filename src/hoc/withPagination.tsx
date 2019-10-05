import React, { Component, Fragment, FC } from "react";
import { Pagination } from "semantic-ui-react";

interface PaginationProps<T> {
    data: T[],
    paginationOptions: {
        currentPage: number,
        itemsPerPage: number
    }
}

const withPagination = (WrappedComponent: React.ComponentType<any>) => {
    return class extends React.Component<PaginationProps<{}>> {
        state = {
            currentPage: 1,
            itemsPerPage: 10
        };

        flipTo = (activePage: number) => {
            this.setState({ currentPage: activePage });
        }
        
        render() {
            return <Fragment>
                <WrappedComponent {...this.props} paginationOptions={this.state} />
                <Pagination totalPages={Math.ceil(this.props.data.length / this.state.itemsPerPage)} siblingRange={2} onPageChange={(e, {activePage = 0}) => this.flipTo(+activePage)} />
            </Fragment>;
        }
    }
}

export default withPagination;