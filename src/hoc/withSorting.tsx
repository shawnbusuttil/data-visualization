import React, { Component, Fragment } from "react";
import { sort } from "../utils/sortingFunctions";

interface SortingProps<T> {
    data: T[]
    sortBy: (sortKey: string) => void
}

const withSorting = (WrappedComponent: React.ComponentType<any>) => {
    return class extends React.Component<SortingProps<{}>> {
        state = {
            sortKey: "id",
            descending: false
        };

        sortBy = (sortKey: string) => {
            if (sortKey === this.state.sortKey) {
                this.setState({ ...this.state, descending: !this.state.descending });
                return;
            }
            this.setState({ sortKey, descending: false });
        }
        
        render() {
            return <Fragment>
                <WrappedComponent {...this.props} sortingOptions={sort(this.props.data, this.state.sortKey, this.state.descending)} sortBy={this.sortBy} />
            </Fragment>;
        }
    }
}

export default withSorting;