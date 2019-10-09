import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { AppState } from "../../store/state";
import { getProfiles } from "../../store/actions";

import Profile from "../../models/Profile";
import Table from "../../components/table/Table";

import withSorting from "../../hoc/withSorting";
import withSearching from "../../hoc/withSearching";
import withPagination from "../../hoc/withPagination";

interface Props {
    data: Profile[],
    getProfiles: () => void
}

const SORTING_OPTIONS = {
    sortingGroups: ["id", "date_of_birth", "salary", "industry"]
}

class DataTable extends React.Component<Props> {
    componentDidMount() {
       this.props.getProfiles();
    }

    render() {
        if (this.props.data.length) {
            const keys = Object.keys(this.props.data[0]);

            let renderedData = [...this.props.data];
            return <Table columns={keys} data={renderedData} />;
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

// Using HOCs will make the DataTable more cutomizable, 
// e.g. in case you need another one which doesn't require pagination/sort/search
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    withSearching(
        withSorting(
            withPagination(DataTable, { currentPage: 1, itemsPerPage: 10 }),
            SORTING_OPTIONS
        ),
    "first_name")
);