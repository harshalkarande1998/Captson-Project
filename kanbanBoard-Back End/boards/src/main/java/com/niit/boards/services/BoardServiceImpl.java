package com.niit.boards.services;

import com.niit.boards.exceptions.*;
import com.niit.boards.model.Board;
import com.niit.boards.model.Member;
import com.niit.boards.proxy.BoardProxy;
import com.niit.boards.repository.BoardRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BoardServiceImpl implements BoardService{
    BoardRepos repos;
    BoardProxy proxy;
    @Autowired
    public BoardServiceImpl(BoardRepos repos, BoardProxy proxy) {
        this.repos = repos;
        this.proxy = proxy;
    }

    @Override
    public boolean addBoard(Board board, String email, HttpServletRequest request) throws BoardAlreadyExistsException, UserNotFoundException, InvalidUserException {
        if(repos.existsById(board.getBoardId())) {
            throw new BoardAlreadyExistsException();
        }
        proxy.addBoard(email, board.getBoardId(),request.getHeader("Authorization"));
        repos.save(board);
        return true;
    }

    @Override
    public boolean updateBoard(Board board, String email) throws BoardNotExistException, UnauthorizedAccessException {

        Optional<Board> isBoard = repos.findById(board.getBoardId());
        if(isBoard.isEmpty())
            throw new BoardNotExistException();
        List<Member> members  = isBoard.get().getBoardMembers();
        List<Member> isMember =
                members.stream().filter(m->m.getMemberEmail().equalsIgnoreCase(email)).collect(Collectors.toList());
        if(isMember.size()==0)
            throw new UnauthorizedAccessException();
        repos.save(board);
        return true;
    }

    @Override
    public boolean deleteBoard(int boardId, String email, HttpServletRequest request) throws BoardNotExistException,
            UnauthorizedDeletionException, UserNotFoundException {
        Optional<Board> isBoard = repos.findById(boardId);
        if(isBoard.isEmpty())
            throw new BoardNotExistException();
        List<Member> members  = isBoard.get().getBoardMembers();

        Member member =
                members.stream().filter(m->m.getMemberEmail().equalsIgnoreCase(email)).collect(Collectors.toList()).get(0);

        if(!member.getMemberAccessLevel().equals("admin"))
            throw new UnauthorizedDeletionException();
        String token = request.getHeader("Authorization");
        for (Member boardMember:members
             ) {
            proxy.deleteBoard(boardMember.getMemberEmail(), boardId,token);
        }
        repos.deleteById(boardId);
        return true;
    }

    @Override
    public Board getBoard(int boardId, String email) throws BoardNotExistException, UnauthorizedAccessException
    {
        Optional<Board> isBoard = repos.findById(boardId);
        if(isBoard.isEmpty())
            throw new BoardNotExistException();
        List<Member> members  = isBoard.get().getBoardMembers();
        List<Member> isMember =
                members.stream().filter(m->m.getMemberEmail().equalsIgnoreCase(email)).collect(Collectors.toList());
        if(isMember.size()==0)
            throw new UnauthorizedAccessException();
        return isBoard.get();
    }
}
