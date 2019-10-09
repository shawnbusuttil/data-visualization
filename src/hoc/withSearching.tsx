import React, { Fragment } from "react";
import { Search, SearchResultProps } from "semantic-ui-react";

import { searchDataSetBy } from "../utils/searchFunctions";

interface SearchProps<T> {
	data: T[];
}

const withSearching = (WrappedComponent: React.ComponentType<any>, key: string) => {
    return class extends React.Component<SearchProps<{}>> {
        state = {
			searchOptions: {
				query: ""
			},
			results: [],
			value: ""
        };

        searchBy = (_e: React.MouseEvent, { result }: any) => {
			this.setState({
				...this.state,
				suggestions: [],
				searchOptions: { query: result.title }
			});
		}
		
		// naive, would use debounce for a smoother experience and loading ui
		onChange = (_e: React.MouseEvent, { value }: any) => {
			let results: SearchResultProps[] = [];

			if (value.length > 3) {
				results = this.props.data.filter(item => {
					return item[key] ? item[key].includes(value) : undefined;
				}).map(i => ({ title: i[key] }));
			}
			this.setState({
				...this.state,
				results,
				value,
				searchOptions: value.length === 0 ? { query: "" } : this.state.searchOptions 
			});
		}
        
        render() {
			return <Fragment>
				<span>Search by:</span>
				<Search showNoResults={false}
					value={this.state.value}
					results={this.state.results}
					onResultSelect={this.searchBy}
					onSearchChange={this.onChange} />
				<WrappedComponent {...this.props} data={searchDataSetBy(this.props.data, key, this.state.searchOptions.query)} />
			</Fragment>;
		}
	}
}

export default withSearching;