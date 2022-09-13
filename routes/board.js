// @ts-check
const express = require('express');

const router = express.Router();
const POST = [
  {
    title: 'title1',
    content: 'content1',
    id: 1,
  },
  {
    title: 'title2',
    content: 'content2',
    id: 2,
  },
];

// 글 목록
router.get('/', (req, res) => {
  const postLen = POST.length;
  res.render('board', { POST, postCounts: postLen });
});

// 글 등록
router.get('/write', (req, res) => {
  res.render('write');
});

router.post('/write', (req, res) => {
  let postID = 1;
  if (POST.length !== 0) postID = POST[POST.length - 1].id + 1;

  if (Object.keys(req.query).length > 0) {
    if (req.query.title && req.query.content) {
      const newPost = {
        title: req.query.title,
        content: req.query.content,
        id: postID,
      };
      POST.push(newPost);
      res.redirect('/board');
    } else {
      const err = new Error('Unexpected query');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    if (req.body.title && req.body.content) {
      const newPost = {
        title: req.body.title,
        content: req.body.content,
        id: postID,
      };
      POST.push(newPost);
      res.redirect('/board');
    } else {
      const err = new Error('Unexpected form data');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('No data');
    err.statusCode = 404;
    throw err;
  }
});

// 글 수정
router.get('/edit/:postID', (req, res) => {
  const arrIndex = POST.findIndex((post) => post.id == req.params.postID);
  if (arrIndex !== -1) {
    const editPost = POST[arrIndex];
    res.render('edit', { editPost });
  } else {
    const err = new Error('postID not found');
    err.statusCode = 404;
    throw err;
  }
});

router.post('/edit/:postID', (req, res) => {
  if (Object.keys(req.query).length > 0) {
    if (req.query.title && req.query.content) {
      const arrIndex = POST.findIndex((post) => post.id == req.params.postID);
      if (arrIndex !== -1) {
        POST[arrIndex].title = req.query.title;
        POST[arrIndex].content = req.query.content;
        res.redirect('/board');
      } else {
        const err = new Error('postID not found');
        err.statusCode = 404;
        throw err;
      }
    } else {
      const err = new Error('Unexpected query');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    if (req.body.title && req.body.content) {
      const arrIndex = POST.findIndex((post) => post.id == req.params.postID);
      if (arrIndex !== -1) {
        POST[arrIndex].title = req.body.title;
        POST[arrIndex].content = req.body.content;
        res.redirect('/board');
      } else {
        const err = new Error('postID not found');
        err.statusCode = 404;
        throw err;
      }
    } else {
      const err = new Error('Unexpected form data');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('No data');
    err.statusCode = 404;
    throw err;
  }
});

// 글 삭제
router.delete('/:postID', (req, res) => {
  const arrIndex = POST.findIndex((post) => post.id == req.params.postID);
  if (arrIndex !== -1) {
    POST.splice(arrIndex, 1);
    res.redirect('/board');
  } else {
    const err = new Error('postID not found');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
