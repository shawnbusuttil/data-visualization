import React, { Fragment } from "react";
import { Search, SearchResultProps } from "semantic-ui-react";
import { searchDataSetBy } from "../utils/searchFunctions";

interface SearchProps<T> {
	data: T[];
}

const withSearching = (WrappedComponent: React.ComponentType<any>) => {
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
					if (item["first_name"]) {
						return item["first_name"].includes(value);
					}
					return undefined;
				}).map(i => {
					return { title: i["first_name"] }
				});
			}
			this.setState({ ...this.state, results, value });
		}
        
        render() {
			return <Fragment>
				<Search showNoResults={false}
					value={this.state.value}
					results={this.state.results}
					onResultSelect={this.searchBy}
					onSearchChange={this.onChange} />
				<button type="button" onClick={() => this.setState({ ...this.state, results: [], searchOptions: { query: "" }})}>Clear</button>
				<WrappedComponent {...this.props} data={searchDataSetBy(this.props.data, "first_name", this.state.searchOptions.query)} />
			</Fragment>;
		}
	}
}

export default withSearching;