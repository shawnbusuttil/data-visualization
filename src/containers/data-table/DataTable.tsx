import React, { Fragment } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Profile } from "../../models/Profile";
import { AppState } from "../../store/state";
import { getProfiles } from "../../store/actions";

type Props = {
    profiles: Profile[],
    getProfiles: () => void
}

class DataTable extends React.Component<Props> {
    componentDidMount() {
       this.props.getProfiles();
    }

    render() {
        return <Fragment></Fragment>;
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        profiles: state.profileState.profiles
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getProfiles: () => dispatch(getProfiles())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);