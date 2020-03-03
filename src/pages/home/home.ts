import './../../css/main.scss';
import './home.scss';

// import * as $ from 'jquery'; // webpack.ProvidePlugin配置过，不引入也可以
import { add } from '../../js/utils';
import avatorImg from "../../images/avator.jpg";

$(function () {
    console.log(add(5, 10));
})
mui('.mui-button-row').on('tap', '#submit', function () {
    console.log(mui('input[name="checkbox"]'));
})
mui('.mui-button-row').on('tap', '#toggle', function () {
    var checkbox$ = mui('input[type="checkbox"]')[0];
    checkbox$.checked = !checkbox$.checked;
})
$('#img').attr('src', avatorImg);