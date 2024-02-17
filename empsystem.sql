--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: department; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.department (
    dep_id bigint NOT NULL,
    dep_name character varying(150)
);


ALTER TABLE public.department OWNER TO postgres;

--
-- Name: department_dep_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.department ALTER COLUMN dep_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.department_dep_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: emp_rank; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.emp_rank (
    rank_id bigint NOT NULL,
    rank_name character varying
);


ALTER TABLE public.emp_rank OWNER TO postgres;

--
-- Name: emp_rank_rank_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.emp_rank ALTER COLUMN rank_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.emp_rank_rank_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: empleave; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empleave (
    leave_id bigint NOT NULL,
    emp_id bigint,
    leave_type character varying(30),
    from_date character varying(20),
    to_date character varying(20),
    days bigint,
    deleted boolean
);


ALTER TABLE public.empleave OWNER TO postgres;

--
-- Name: empleave_leave_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.empleave ALTER COLUMN leave_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.empleave_leave_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee (
    emp_id bigint NOT NULL,
    emp_name character varying(50),
    nrc character varying(20),
    phone character varying(15),
    email character varying(30),
    dob character varying(10),
    rank character varying(50),
    department character varying(50),
    address character varying(100),
    checkdelete boolean
);


ALTER TABLE public.employee OWNER TO postgres;

--
-- Name: employee_emp_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.employee ALTER COLUMN emp_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.employee_emp_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: department; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.department (dep_id, dep_name) FROM stdin;
1	Sales
2	Finace
3	Production
4	Admin
5	Customer Service
\.


--
-- Data for Name: emp_rank; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.emp_rank (rank_id, rank_name) FROM stdin;
1	Junior
2	Senior
3	Leader
\.


--
-- Data for Name: empleave; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.empleave (leave_id, emp_id, leave_type, from_date, to_date, days, deleted) FROM stdin;
1	1	Casual Leave	2024-02-17	2024-02-19	2	f
2	2	Casual Leave	2024-02-19	2024-02-20	1	f
\.


--
-- Data for Name: employee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee (emp_id, emp_name, nrc, phone, email, dob, rank, department, address, checkdelete) FROM stdin;
1	kaung khant zaw	11/Htarwai(N)00000	0988888888	kaung@gmail.com	2017-02-02	Senior	Finace	North Dagon	f
2	Hein Thant Aung	5/MLa(N)111	09222222222	heing@gmail.com	2007-02-08	Leader	Admin	Lanmadaw 	f
3	Htet Phyo Wai	5/WaLaNa(N)22222	099999999	htet@gmail.com	2004-07-24	Junior	Finace	sagaing	f
4	Nyi Aung Moe	8/MDY(N)44444	0988888888	aung@gmail.com	2016-06-16	Junior	Customer Service	Mandalay	f
5	Zin Mode Naung	5/WaLaNa(N)	0966666666	zin@gmail.com	2014-02-20	Senior	Admin	sagaing	f
6	Hein Htet	9/THA(N)22222	093333333	htet@gmail.com	2014-07-16	Junior	Sales	Monya	f
\.


--
-- Name: department_dep_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.department_dep_id_seq', 5, true);


--
-- Name: emp_rank_rank_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.emp_rank_rank_id_seq', 3, true);


--
-- Name: empleave_leave_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.empleave_leave_id_seq', 2, true);


--
-- Name: employee_emp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_emp_id_seq', 6, true);


--
-- Name: department department_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (dep_id);


--
-- Name: emp_rank emp_rank_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.emp_rank
    ADD CONSTRAINT emp_rank_pkey PRIMARY KEY (rank_id);


--
-- Name: empleave empleave_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleave
    ADD CONSTRAINT empleave_pkey PRIMARY KEY (leave_id);


--
-- Name: employee employee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (emp_id);


--
-- Name: empleave empleave_emp_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleave
    ADD CONSTRAINT empleave_emp_id_fkey FOREIGN KEY (emp_id) REFERENCES public.employee(emp_id);


--
-- PostgreSQL database dump complete
--

