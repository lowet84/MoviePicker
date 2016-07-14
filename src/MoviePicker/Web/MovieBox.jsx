export default React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        var movies = this.state.data.map(function (item) {
            return (
                <p key={item.Name+'-'+item.Year}>
                    {item.Name} ({item.Year}) {item.Seeders}
                </p>
            );
        });
        return (
            <div>
                <h1>Top Movies!</h1>
                <div>{movies}</div>
            </div>
        );
    }
});
