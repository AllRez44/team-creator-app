import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'teamApp';
  newMemberName = '' //String Variable linked directly to the value of the input '#memberNameInput' 
  members: string[] = []; //Declared as an array of strings that is initially an empty array.
  empty = true; // Boolean Variable used to state the Pre Text inside the ul 'membersList', whether the List is empty or not. When a value is inserted into the 'members' array, it changes it's value to false an activates the 'removePreList()' function.
  errorMessage = '' //String Variable that will display an error message if the user does something wrong.  
  teams: string[][] = []; //Declares that "teams" is an array of string arrays (ex.: teams[team1['a','b'],team2['c','d'], ...]) 
  numOfTeams: number | string = '' ; //Declared as a number OR an empty string to show the placeholder. If it's declared as a number, It should be set to a value and that value would show inside the input, then not showing the placeholder. 
  //*OBS.: "|" is the "||"(or) of TypeScript. 
  teamIndex: number | string = '1'

  onMemberNameInput(input:string){
    this.newMemberName = input
  }

  onNumOfTeamsInput(input:string){ //declared as a string because it actually is returned from the html as a number string (ex.: '4' and not 4).
    this.numOfTeams = Number(input) //Here It converts the number string to a regular number. "Number" is the "parseInt" of TypeScript 
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

  createTeams(){
    if (this.teams.length){ //Clears the previously created team to create a new one.
      this.teams = []
      this.numOfTeams = 0
    }

    if (!this.numOfTeams || this.numOfTeams <= 0){ //Conditional that says: If "this.numOfTeams" is a string or this.numOfTeams is equal or less than "0", return nothing and stop the rest of the function. By setting this, the function will only return positive numbers.
      this.errorMessage = 'Invalid Number!'
      return
    }

    if (this.members.length < this.numOfTeams){
      this.errorMessage = 'Not Enough Members'
      return
    }

    this.errorMessage = '' //Clears the error messages if now it matches the appropriated conditions to create a team.
    
    const allMembers = [...this.members] //Declared an Array that pulls all the "teams" array elements (members in this case).
    console.log('All members: ', allMembers)
    
    while (allMembers.length){ //While 'allMembers' array's length has some value different from '0', it executes this 'for' loop. 
      for (let i=0; i < this.numOfTeams; i++){
        const randomIndex = Math.floor(Math.random() * allMembers.length) //Declares a random index number from '0' to the length of the "allMembers" array minus one (because it floors the number)
        console.log('random index: ',randomIndex)
        console.log('all members', randomIndex, ': ', allMembers[randomIndex]) //Prints the string from 'allMembers' array with the random Index.
        const member = allMembers.splice(randomIndex,1)[0] //Splice returns an array from 'allMembers' array starting at the random index and ending at '1' element, so It's just the element of the random index inside the 'allMembers' array. 
        //the '0' is because splice returns an array, so it specifies that 'member' gets the first (and only, since its an array of just one element) index of this the spliced array. 
        console.log('member: ', member)
        
        if (!member) break //If member's value is null or 'undefinned', then it breaks the loop, not adding it to the teams array.

        if(this.teams[i]){
          this.teams[i].push(member) //If an element inside the 'teams' array of the 'i' index exists, then it pushed the 'member' array into it.
        } else{
          this.teams[i] = [member] //Else, it creates an element of this 'i' index that recieves the 'member' array.  
        }
      }
    }

    let i = 1

    for (let team of this.teams){
      
      for (let member of team ){
        console.log(member)
      }
      i++
    }
    console.log('\n', '-----------------')
}
}
