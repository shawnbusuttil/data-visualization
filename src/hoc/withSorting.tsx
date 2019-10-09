import React, { Fragment } from "react";

import { sort } from "../utils/sortingFunctions";

interface SortingProps<T> {
    data: T[]
    sortBy: (sortKey: string) => void
}

interface SortingOptions {
    sortingGroups: string[]
}

const withSorting = (WrappedComponent: React.ComponentType<any>, sortingOptions: SortingOptions) => {
    return class extends React.Component<SortingProps<{}>> {
        state = {
            sortKey: "id",
            isDescending: false
        };

        sortBy = (sortKey: string) => {
            this.setState({ sortKey });
        }
        
        render() {
            return <Fragment>
                <span>Sort by: </span>
                <select className="sortBy" onChange={(e) => this.sortBy(e.target.value)}>
                    {sortingOptions.sortingGroups.map(grp => <option key={grp} value={grp}>{grp}</option>)}
                </select>
                <button onClick={() => this.setState({ isDescending: !this.state.isDescending })}>
                    { this.state.isDescending ? "Descending" : "Ascending" }
                </button>
                <WrappedComponent {...this.props} data={sort(this.props.data, this.state.sortKey, this.state.isDescending)} />
            </Fragment>;
        }
    }
}

export default withSorting;