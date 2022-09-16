import { Injectable } from '@angular/core';
import { Member } from '../classes/member';

@Injectable({
  providedIn: 'root'
})
export class MemberTransferService {
  newMember!:Member
  isMemberAdded:boolean=false

  addNewMember(member:Member)
  {
    this.newMember=member;
    this.isMemberAdded=true
  }
  getMember()
  {
    return this.newMember
  }
  constructor() { }
}
