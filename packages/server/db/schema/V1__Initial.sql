CREATE TABLE messages
(
    id uuid PRIMARY KEY,
    content TEXT,
    created TIMESTAMP NOT NULL,
    userId INTEGER
);
