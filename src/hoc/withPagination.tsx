import React, { Fragment } from "react";
import { Pagination } from "semantic-ui-react";

interface PaginationProps<T> {
    data: T[]
}

interface PaginationOptions {
    currentPage: number;
    itemsPerPage: number;
}

const withPagination = (WrappedComponent: React.ComponentType<any>, paginationOptions: PaginationOptions) => {
    return class extends React.Component<PaginationProps<{}>> {
        state = {
            start: 0,
            end: paginationOptions.itemsPerPage
        }

        flipTo = (activePage: number) => {
            const start = (activePage - 1) * paginationOptions.itemsPerPage;
            const end = start + paginationOptions.itemsPerPage;
            this.setState({ start, end });
        }

        getPartition = () => {
            return this.props.data.slice(this.state.start, this.state.end);
        }
        
        render() {
            return <Fragment>
                <WrappedComponent {...this.props} data={this.getPartition()} />
                {this.props.data.length ? <Pagination totalPages={Math.ceil(this.props.data.length / paginationOptions.itemsPerPage).toString()} siblingRange={"2"} defaultActivePage={1} onPageChange={(_e, {activePage = 0}) => this.flipTo(+activePage)} /> : null}
            </Fragment>;
        }
    }
}

export default withPagination;