export default React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    expand: function (index) {
        var data = this.state.data;
        data[index].expanded = data[index].expanded != true;

        this.setState({data: data});
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        var movies = this.state.data.map(function (item, index) {
            if (item.expanded == true) {
                var children = item.Results.map(function (item, index) {
                    return (
                        <a key={this.index + "_" + index}>[{item.ReleaseTitle}]</a>
                    );
                }, this);
                return (
                    <div key={index}>
                        <p onClick={()=>this.expand(index)}>
                            {item.Name} ({item.Year}) {item.Seeders}
                        </p>
                        {children}
                    </div>
                );
            }
            else {
                return (
                    <p key={index} onClick={()=>this.expand(index)}>
                        {item.Name} ({item.Year}) {item.Seeders}
                    </p>
                );
            }
        }, this);
        return (
            <div>
                <h1>Top Movies!</h1>
                <div>{movies}</div>
            </div>
        );
    }
});
