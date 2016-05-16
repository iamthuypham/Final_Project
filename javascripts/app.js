function drag(task) {
  $(task).draggable({
    cursor: "default",
    revert: true,
    revertDuration: 0
    })
}
function complete(task){
  $(task).children('input').click(function(){
      if (this.checked) {
          $(this).parent().appendTo($('#completed'))
          $(this).attr('disabled',true)
      }
  })
}
function redo(task){
  $(task).dblclick(function(){
    $(this).appendTo($('.new'))
    $(this).children('input').attr('checked',false).attr('disabled',false)
  })
}
function dropTask(){
  $('.box').droppable({
    tolerance:'intersect',
    hoverClass: 'hovered',
    drop: function(event,ui){
      ui.draggable.detach().appendTo($(this).children('ul'));
      ui.draggable.children('input').attr('checked',false).attr('disabled',false);
    }
  });
}
//WHEN PAGE LOAD
drag('.task');
dropTask();
complete('.task');
redo('.task');

//WHEN ADD A NEW TASK
$('#addNew').keypress(function(event){
  var newTask ='';
  if (event.which ==13){
    newTask='<li class=\'task newTask\' style=\'position: relative;\'><input type=checkbox><span>'+$(this).val()+'</span></li>';
    $('.new').append(newTask);
  }
  drag('.newTask');
  complete('.newTask');
  redo('.newTask');
  $('.newTask').removeClass('newTask');
})
