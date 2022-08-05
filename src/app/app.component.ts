import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'teamApp';
  newMemberName = '' //String Variable linked directly to the value of the input '#memberNameInput' 
  members: string[] = []; //Declared a array of strings named 'members'
  empty = true; // Boolean Variable used to state the Pre Text inside the ul 'membersList', whether the List is empty or not. When a value is inserted into the 'members' array, it changes it's value to false an activates the 'removePreList()' function.
  errorMessage = '' //String Variable that will display an error message if the user does something wrong.

  memberNameInputFun(input:string){
    this.newMemberName = input
  }

  addMember(){ 
    if (!this.newMemberName){
      this.errorMessage = "Name can't be empty!"
      return //Return here will make the funtction return nothing, stopping the following actions. So, it won't push empty strings to the 'members' array. Also, it won't remove the Pre List Text 
    }

    this.members.push(this.newMemberName) //Push to the 'members' array current element the inputed value which is stored inside the 'newMemberName' variable.
    console.log(this.members)
    this.newMemberName = '' //Put an empty string into the input value so the last name writen won't be there after it's insertion into the 'members' array.
    this.errorMessage = '' //Clears the error message when the user inputs a valid name.
    
   //Remove the Pre List of Examples
    if (this.empty){
      this.empty = false
      this.removePreList()
    }
  }
//Remove Pre List Function
  removePreList(){
    let i = 0
    let preList = document.getElementsByClassName('preListLi') 
    console.log(preList)
    while(i < preList.length ){
        preList[i].innerHTML = ""
        i++
    }
  }
}
