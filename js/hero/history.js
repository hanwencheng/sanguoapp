/**
 * Created by Hanwen on 2014/10/28.
 */

define(function(){
    var container = document.getElementById('hero-history');

    var history = '趙雲（？－229年），字子龍，常山真定（今河北省正定）人。 他身高八尺，姿顏雄偉，是三國時期蜀漢的將領。陈寿在撰写《三国志》的时候，将赵云与关羽、张飞、马超、黄忠合为一传（《三国志·蜀书·关张马黄赵传》）。'

    var paragraph = document.createElement('div');
    var paragraphText = document.createTextNode(history);
    paragraph.appendChild(paragraphText);
    paragraph.className = 'hero-history-introduction';
    container.appendChild(paragraph);
});