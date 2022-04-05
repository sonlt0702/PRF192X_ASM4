$(document).ready(function(){
    // khai báo biến token để dễ dàng chỉnh sửa token API
    let token='1baa1e756fc14d6b31f5a832b3f5b745';
    // khai báo top-heading mặc định khi khởi động
    let topic='breaking-news';
    let newsAPI='https://gnews.io/api/v4/top-headlines?topic='+topic+'&token='+token+'&lang=en';
    // hàm khởi động trang web
    function start(){
        getNews(newsAPI,renderNews);
        changeTopic();
        search();
    }
    // gọi hàm khởi động trang web
    start();
    // hàm lấy dữ liệu từ data
    function getNews(api,callback){
        $.ajax({
            type: "GET",
            url: api,
            dataType: 'json',
            // thêm biểu tượng loading trước khi tải xong dữ liệu từ data
            beforeSend: function(){
                $("#loading").removeClass('hidden');
            },
            success: callback,
            // sau khi hoàn thành thì ẩn biểu tượng loading
            complete: function(){
                $("#loading").addClass('hidden');
            }
        });
    }
    // hàm render ra giao diện tin tức
    function renderNews(news){
        let root=$("#root");
        let htmls=news.articles.map(function(result){
            return `
            <div class="row">
            <div class="col-12 col-md-4">
                <img src="${result.image}">
            </div>
            <div class="col-12 col-md-8">
                <ul>
                    <li><a href="${result.url}" target="_blank">${result.title}</a></li>
                    <li><i>${result.publishedAt}</i></li>
                    <li>${result.content}</li>
                </ul>
            </div>
        </div>
            `
        });
        root.html(htmls.join(''));
    }
    // hàm thay đổi topic của top heading
    function changeTopic(){
        $("#news").click(function(){
            topic='breaking-news';
            newsAPI='https://gnews.io/api/v4/top-headlines?topic='+topic+'&token='+token+'&lang=en';

            getNews(newsAPI,renderNews);
        });
        
        $("#business").click(function(){
            topic='business';
            newsAPI='https://gnews.io/api/v4/top-headlines?topic='+topic+'&token='+token+'&lang=en';

            getNews(newsAPI,renderNews);
        });
        $("#technology").click(function(){
            topic='technology';
            newsAPI='https://gnews.io/api/v4/top-headlines?topic='+topic+'&token='+token+'&lang=en';

            getNews(newsAPI,renderNews);
        });
        $("#sports").click(function(){
            topic='sports';
            newsAPI='https://gnews.io/api/v4/top-headlines?topic='+topic+'&token='+token+'&lang=en';

            getNews(newsAPI,renderNews);
        });
        $("#science").click(function(){
            topic='science';
            newsAPI='https://gnews.io/api/v4/top-headlines?topic='+topic+'&token='+token+'&lang=en';

            getNews(newsAPI,renderNews);
        });
    }
    // hàm search tích hợp lọc khoảng thời gian tìm kiếm bằng cách thay đổi URL APi
    function search(){
        $(".fa-search").click(function(){
            $(".backdrop,.search-box").css("display","block")
            $("#btn").click(function(){
                let search = $("#search").val();
                let fromDate=$("#fromDate").val();
                let toDate=$("#toDate").val();
                if (search){
                    $("#search").val('');
                    $("#fromDate").val('');
                    $("#toDate").val('');
                    // khai báo 1 API search mặc định
                    let searchAPI='https://gnews.io/api/v4/search?q='+search+'&token='+token+'&lang=en';
                    // kiểm tra dữ liệu người dùng nhập vào, chấp nhận có hoặc không có(nếu không có lấy API mặc định)
                    if (fromDate && toDate){
                        fromDate=new Date(fromDate);
                        toDate=new Date(toDate);
                        // chuyển format date người dùng nhập vào thành dạng mà API có thể nhận được
                        let fromDateISO = fromDate.toISOString().split('').slice(0,19).join('')+"Z";
                        let toDateISO = toDate.toISOString().split('').slice(0,19).join('')+"Z";
                        searchAPI='https://gnews.io/api/v4/search?q='+search+'&token='+token+'&lang=en&from='+fromDateISO+'&to='+toDateISO;
                    }
                    if (!fromDate && toDate){
                        toDate=new Date(toDate);
                        let toDateISO = toDate.toISOString().split('').slice(0,19).join('')+"Z";
                        searchAPI='https://gnews.io/api/v4/search?q='+search+'&token='+token+'&lang=en&to='+toDateISO;
                    } 
                    if (fromDate && !toDate) {
                        fromDate=new Date(fromDate);
                        let fromDateISO = fromDate.toISOString().split('').slice(0,19).join('')+"Z";
                        searchAPI='https://gnews.io/api/v4/search?q='+search+'&token='+token+'&lang=en&from='+fromDateISO;
                    }
                    getNews(searchAPI,renderNews);
                    $(".backdrop,.search-box").css("display","none");
                }else{
                    $(".backdrop,.search-box").css("display","none");
                }
            });
            // click vào nút X để đóng search box
            $(".fa-window-close").click(function(){
                $(".backdrop,.search-box").css("display","none");
            });
        });
    }
});