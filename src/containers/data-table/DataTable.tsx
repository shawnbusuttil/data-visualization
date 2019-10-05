import React, { Fragment } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { AppState } from "../../store/state";
import { getProfiles } from "../../store/actions";

import Profile from "../../models/Profile";
import Table from "../../components/table/Table";

import withSorting from "../../hoc/withSorting";
import withPagination from "../../hoc/withPagination";

import { sort, sortByDOB } from "../../utils/sortingFunctions";

interface Props {
    data: Profile[],
    getProfiles: () => void,
    sortBy: (key: string) => void,
    sortingOptions?: { sortKey: string, descending: boolean },
    paginationOptions?: { currentPage: number, itemsPerPage: number }
}

class DataTable extends React.Component<Props> {
    state = {
        sortGroups: ["date_of_birth", "salary", "industry"]
    };

    componentDidMount() {
       this.props.getProfiles();
    }

    render() {
        if (this.props.data.length) {
            const keys = Object.keys(this.props.data[0]).map(key => {
                return { name: key, isSortable: this.state.sortGroups.includes(key) }
            });

            let renderedData = [...this.props.data];

            if (this.props.sortingOptions) {
                const { sortKey, descending } = this.props.sortingOptions;

                renderedData = sortKey === "date_of_birth" 
                    ? sortByDOB(this.props.data, sortKey, descending) 
                    : sort(this.props.data, sortKey, descending);
            }
            
            if (this.props.paginationOptions) {
                const { currentPage, itemsPerPage } = this.props.paginationOptions;
                const start = (currentPage - 1) * itemsPerPage; 
                const end = start + itemsPerPage;

                renderedData = renderedData.slice(start, end);
            }
            
            return <Table columns={keys} data={renderedData} clicked={this.props.sortBy} />;
        }

        return <p>No Data</p>;
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        data: state.profileState.profiles
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getProfiles: () => dispatch(getProfiles())
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(withPagination(withSorting(DataTable)));